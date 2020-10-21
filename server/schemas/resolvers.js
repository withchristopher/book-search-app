const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('savedBooks');
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
          }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            
            return{ token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { bookId: context.bookId },
                    { $addToSet: { books: bookId } },
                    { new: true }
                ).populate('savedbooks');

                return updatedUser
            }

            throw new AuthenticationError('You need to be logged in');
        },
        removeBook: async (parent, {bookId}, context ) => {
            const updatedUser = await User.findOneAndDelete(
                { _id: context.user._id },
                { $pull: {savedBooks: { bookId: bookId } } },
                {new: true}
            );
            return updatedUser;
        }
    }
};

module.exports = resolvers;