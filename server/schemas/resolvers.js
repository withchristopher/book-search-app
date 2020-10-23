const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                // .populate('thoughts')
                // .populate('friends');
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
          },
        },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return { token, user };
          
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        console.log("i am at login")
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const correctPw = await user.isCorrectPassword(password);
      
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
      
        const token = signToken(user);
        return { token, user };
      },
      saveBook: async (parent, { input }, context) => {
          console.log("i am at save book line 45")
          console.log(input.bookId)
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: input  } },
            { new: true, runValidators: true }
          );
      
          return updatedUser;
        }
      
        throw new AuthenticationError('You need to be logged in!');
      },
    //   async deleteBook({ user, params }, res) {
        removeBook: async (parent, {bookId}, context) => {
            console.log("i am at line 61")
            console.log(bookId)
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
        return updatedUser;
      },
    }
};

module.exports = resolvers;