import { ApolloServer } from "apollo-server"
import { typeDefs } from "./graphql/typeDefs.js"
import { resolvers } from './graphql/resolvers.js'
import { serverConfig } from "./config/config.js"
import db from "./utils/db.js"


const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
        origin: '*',
        credentials: true,
    },
    context: ({ req }) => ({ req, db }),
})

server.listen({ port: serverConfig.port }).then(({ url }) => {
    console.log(`Server ready at ${url} and port is ${serverConfig.port}`);
})