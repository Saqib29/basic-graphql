import { ApolloServer } from "apollo-server"
import { typeDefs } from "./graphql/typeDefs.js"
import dotenv from 'dotenv'

dotenv.config()

const server = new ApolloServer({
    typeDefs,
    // resolvers,
    context: ({ req }) => ({ req, db }),
})

server.listen({ port: 3000 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
})