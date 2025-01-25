import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { ApolloServer } from '@apollo/server'
import { createServer } from 'http'

import { typeDefs } from './schema.js'
import { resolvers } from './resolvers.js'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/use/ws'
import { expressMiddleware } from '@apollo/server/express4'


const app = express()
app.use(express.json())

const schema = makeExecutableSchema({ typeDefs, resolvers })

const httpServer = createServer(app)

const wsServer = new WebSocketServer({
  server: httpServer,
  path:'/graphql'
})
const wsServerCleanup = useServer({ schema }, wsServer)

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {
      req
    }
  }
})
await server.start()

app.use('/graphql', expressMiddleware(server))


httpServer.listen(process.env.PORT, () => {
  console.log(`server started at http://localhost:${process.env.PORT}/graphql`)
})