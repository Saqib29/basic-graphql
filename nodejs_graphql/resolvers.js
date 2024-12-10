const { User } = require('./models');
const bcrypt = require("bcrypt")
const jsonwebtoken = require('jsonwebtoken');

const JWT_SECRETE = require('./constants');

const resolvers = {
    Query: {
        async current(_, args, { user }) {
            if (user) return await User.findOne({ where: { id: user.id }});
            throw new Error("Sorry, you are not an authenticated user!");
        }
    },

    Mutation: {
        async register(_, { login, password}) {
            const user = await User.create({ login, password: await bcrypt.hash(password, 10) })
            return jsonwebtoken.sign({ id: user.id, login: user.login }, JWT_SECRETE, {
                expiresIn: "3m",
            })
        },

        async login(_, { login, password }) {
            const user = await User.findOne({ where: { login } });
            if (!user) throw new Error(
                "This user doesn't exist. Please, make sure to the right login"
            );

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) throw new Error('Password is incorrect');

            return jsonwebtoken.sign({ id: user.id, login: user.login }, JWT_SECRETE, {
                expiresIn: "1d",
            })


        }
    }
}

module.exports = resolvers;