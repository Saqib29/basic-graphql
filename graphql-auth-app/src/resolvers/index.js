import User from "../models/user.model.js"
import { comparePassword, hashPassword } from "../utils/bcrypt.js"
import { generateToken } from "../utils/jwt.js";

export const resolvers = {
  Query: {
    me: (_, __, { user }) => user,
  },

  Mutation: {
    signUp: async (_, { username, password }) => {
      const hashedPassword = await hashPassword(password);
      const user = await User.create({
        username,
        password: hashedPassword,
      });

      return generateToken(user)
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ where: { username } })
      if (!user || !(await comparePassword(password, user.password))) {
        throw new Error('Invalid credentials')
      }

      return generateToken(user)
    }

  },
};