const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('books');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = singToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user was found with this email address.')
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect user credentials.');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async () => {
            // Accepts a book author's array, description, title, bookId, image and link as parameters; returns a User type.
            // Look into creating what's known as an INPUT type to handle all of these parameters
        },
        removeBook: async (parent, { bookId }, context) => {
            // Returns a User type
        }
    }
}

module.exports = resolvers;