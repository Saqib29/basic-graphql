import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type BlogPost {
    _id: String
    title: String
    body: String
    postImage: String
  }

  type Aggregate {
    count: String
  }

  type BlogPosts {
    nodes: [BlogPost]
    aggregate: Aggregate
  }

  type Query {
    blogPosts: BlogPost
    blogPost(id: String): BlogPost
  }

  type Mutation {
    addBlogPost(title: String, body: String, postImage: String): BlogPost
  }
`