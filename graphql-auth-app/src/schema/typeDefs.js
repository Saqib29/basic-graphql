import { gql } from "apollo-server-express";

export const typeDefs = gql`
  directive @auth(role: String) on FIELD_DEFINITION

  type User {
    id: ID!
    username: String!
    role: String!
  }

  type Query {
    me: User @auth
  }

  type Mutation {
    signUp(username: String!, password: String!): String
    login(username: String!, password: String!): String
  }
`