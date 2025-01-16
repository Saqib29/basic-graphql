import express from 'express';
import cors from 'cors';
import { authDirective } from './directives/auth.directive.js';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/index.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import sequelize from './db/database.js';
import { serverConfig } from './config/config.js';
import { verifyToken } from './utils/jwt.js';

const app = express();
app.use(cors());
app.use(express.json());

// Apply auth directive transformation
const { authDirectiveTransformer } = authDirective('auth');
let schema = makeExecutableSchema({ typeDefs, resolvers });
schema = authDirectiveTransformer(schema);

const server = new ApolloServer({
  schema,
});

await server.start();

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization?.replace('Bearer ', '').trim();
      const user = token ? verifyToken(token) : null;
      return { user };
    },
  })
);

await sequelize.sync({ force: true });
console.log('Database connected');

app.listen(serverConfig.port, () => console.log(`Server running on http://localhost:${serverConfig.port}/graphql`));
