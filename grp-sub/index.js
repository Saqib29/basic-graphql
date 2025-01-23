import express from 'express'
import dotenv from 'dotenv'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'

dotenv.config()

const app = express()

const server = new ApolloServer({
  playground: {
    endpoint: "/graphql",
    settings: {
      "editor.theme": "light"
    }
  }
})

server.applyMiddleware({ app })

const httpServer = createServer(app)

httpServer.listen(process.env.PORT, () => {
  console.log(`server started at http:/localhost:${process.env.PORT}/graphql`)
})