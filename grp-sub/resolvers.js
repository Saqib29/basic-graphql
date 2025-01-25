import { PubSub } from 'graphql-subscriptions'
import { blogPosts } from './data.js'

const pubsub = new PubSub()

export const resolvers = {
  Query: {
    blogPosts(parent, args, context, info) {

      return {
        nodes: blogPosts,
        aggregate: {
          count: blogPosts.length
        }
      }
    },

    blogPost(parent, args, context, info) {
      const id = args.id

      return blogPosts.find(post => post._id === id)
    }
  },

  Mutation: {
    addBlogPost(parent, args, context, info) {
      const { title, body, postImage } = args
      const newBlogPost = {
        _id: Date.now(),
        title,
        body,
        postImage
      }

      blogPosts.push(newBlogPost)

      pubsub.publish('NEW_BLOGPOST', { newBlogPost })

      return newBlogPost
    }
  },

  Subscription: {
    newBlogPost: {
      resolve: (payload) => payload.newBlogPost,
      subscribe: () => pubsub.asyncIterableIterator(['NEW_BLOGPOST'])
    }
  }
}