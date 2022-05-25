// Import Apollo GraphQL
const { gql } = require("apollo-server-express");

// Setup type definitions
const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        shortBio: String
        homeCity: String
        friends: [ID]
        activities: [ID]
        friendCount: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Activity {
        _id: ID!
        name: String!
        location: String!
        lng: Int
        lat: Int
        description: String!
        participants: [User]
    }

    type Query {
        # Supports query of one or multiple users
        users(_id: String): [User]

        # Query for the logged in user of "User" type and return only selected fields.
        me: User

        # Supports query of one or multiple activities
        activities(_id: String): [Activity]
    }

    type Mutation {
        # Create a user with username, email, password and return an Auth object
        createUser(username: String!, email: String!, password: String!, shortBio: String, homeCity: String): Auth

        # Login user with the option to enter a username or email and require the password and return an Auth object
        login(username: String, email: String, password: String!): Auth

        # Edit user details and return and updated user
        editUser(shortBio: String!, homeCity: String!): User

        # Add a friend to a user
        addFriend(id: ID!): User

        # Remove a friend from a user
        removeFriend(id: ID!): User

        # Add an activity to a user
        addActivity(id: ID!): User

        # Remove an activity from a user
        removeActivity(id: ID!): User

        # Create an activity
        #createActivity(name): User

        # Add an participant to an activity
        #addParticipant(id: ID!): Activity

        # Remove an participant to an activity
        #removeParticipant(id: ID!): Activity
    }
`;

module.exports = typeDefs;
