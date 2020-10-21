const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
    friends: [User]
}

type Book {
    bookId: ID
    authors: [Authors]
    description: String
    title: String
    image: Image
    link: Link
}


type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookTitle: String!): Title
    removeBook(bookId: ID!): Title
  }

`;

module.exports = typeDefs;