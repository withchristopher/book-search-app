const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        books: async (parent, {username}) => {
            const params = username ? {username}: {};
            return Book.find(params).sort({ title: -1 });
        }
    }
}
