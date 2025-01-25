import express from 'express'
import { ApolloServer } from '@apollo/server'
import { createServer } from 'http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { PubSub } from 'graphql-subscriptions'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/use/ws'
import { expressMiddleware } from '@apollo/server/express4'

// Create a PubSub instance
const pubsub = new PubSub()

// Define the schema
const typeDefs = `
  type Query {
    hello: String
  }

  type Mutation {
    sendMessage(message: String!): String
  }

  type Subscription {
    messageSent: String
  }
`

// Define the resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },

  Mutation: {
    sendMessage(_, { message }) {
      pubsub.publish('MESSAGE_SENT', { messageSent: message })
      return message
    }
  },

  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterableIterator(['MESSAGE_SENT'])
    }
  }
}

// Create a schema
const schema = makeExecutableSchema({ typeDefs, resolvers })

// Create an Express Application
const app = express()
app.use(express.json())

// create an http server for both HTTP and WebSocket connections
const httpServer = createServer(app)

// Create a WebSocket server with the graphql schema
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
})

const wsServerCleanup = useServer({ schema }, wsServer)

// Create an Apollo Server
const apolloServer = new ApolloServer({
  schema,
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await wsServerCleanup.dispose()
          }
        }
      }
    }
  ]
})
await apolloServer.start();

app.use('/graphql', expressMiddleware(apolloServer));

httpServer.listen(4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  console.log(`🚀 Subscriptions ready at ws://localhost:4000/graphql`);
})