const typeDefs = `#graphql
    type User {
        id: Int!
        logIn: String!
    }

    type Beer {
        id: Int!
        name: String!
        brand: String
        price: Float
    }

    type Query {
        current: User
        beer(id: Int!): Beer
        beers(brand: String!): [Beer]
    }

    type Mutation {
        register(login: String!, password: String!): String
        login(login: String!, password: String!): String
    }
`

export default typeDefs;