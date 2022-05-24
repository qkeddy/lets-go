// Import Apollo GraphQL
const { gql } = require("apollo-server-express");

// Setup type definitions
const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        # Supports query of one or multiple users
        users(_id: String): [User]

        # A query for the logged in user of "User" type and return only selected fields.
        me: User
    }

    type Mutation {
        # Create a user with username, email, password all required
        createUser(username: String!, email: String!, password: String!): Auth

        # Login user with the option to enter a username or email and require the password
        login(username: String, email: String, password: String!): Auth

    }
`;

module.exports = typeDefs;
