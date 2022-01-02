const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        _id: ID
        authors: [String]
        description: String 
        bookId: String 
        image: String
        link: String
        title: String
    }
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Query {
        me: User
    }
    type Auth {
        user: User
        token: ID!
    }
    input savedBookInput {
        authors: [String]
        description: String
        bookId: String 
        image: String 
        link: String 
        title: String
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(book: savedBookInput): User
        removeBook(bookId: String!): User
    }
    `;
    module.exports = typeDefs;