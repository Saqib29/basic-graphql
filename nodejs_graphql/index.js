const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');

const bodyParser = require("body-parser");
const cors = require('cors')
const express = require('express')
const http = require('http')
const { expressjwt: jwt } = require('express-jwt')
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require("./schema.js");
const resolvers = require("./resolvers.js");
const JWT_SECRET = require("./constants.js");


const app = express()
const httpServer = http.createServer(app)

const auth = jwt({
    secret: JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
});
app.use(auth)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server.start().then(() => {
  app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const user = req.auth ? req.auth : null;
        return { user };
      },
    })
  );

  httpServer.listen({ port: 3000 }, () => {
    console.log(`Server ready at http:localhost:3000`);
  });
});