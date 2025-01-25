import { PubSub } from 'graphql-subscriptions'
import _r from './data.json' assert { type: 'json' }

const pubsub = new PubSub()

export const resolvers = {
  Query: {
    blogPost(parent, args, context, info) {
      const blogPosts = _r.blogPosts

      return {
        node: blogPosts,
        aggregate: {
          count: blogPosts.length
        }
      }
    },

    blogPost(parent, args, context, info) {
      const blogPost = _r.blogPosts
      const id = args.id

      return blogPost.find(post => post._id === id)
    }
  },

  Mutation: {
    addBlogPost(parent, args, context, info) {
      const { title, body, postImage } = args
      const blogPost = {
        _id: Date.now(),
        title,
        body,
        postImage
      }

      _r.blogPosts.push(blogPost)

      pubsub.publish('NEW_BLOGPOST', { newBlogPost: blogPost })

      return blogPost
    }
  },

  Subscription: {
    newBlogPost: {
      resolve: (payload) => payload.newBlogPost,
      subscribe: () => pubsub.asyncIterator(['NEW_BLOGPOST'])
    }
  }
}