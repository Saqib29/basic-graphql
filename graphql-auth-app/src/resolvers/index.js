import User from "../models/user.model"
import { comparePassword, hashPassword } from "../utils/bcrypt"
import { generateToken } from "../utils/jwt";

export const resolvers = {
  Query: {
    me: (_, __, { user }) => user,
  },

  Mutation: {
    singUp: async (_, { username, password }) => {
      const hashPassword = await hashPassword(password);
      const user = await User.create({
        username,
        password: hashPassword,
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