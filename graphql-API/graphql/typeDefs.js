import { gql } from "apollo-server";

export const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
    }

    type Query {
        getUser(id: ID!): User
        getAllUsers: [User]
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!): User
        updateUser(id: ID!, firstName: String!, lastName: String!): User
        deleteUser(id: ID!): User
    }

`

