// Import Signing & Authentication libraries
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

// Import Mongoose data model
const { User } = require("../models");
const Activity = require("../models/Activities");

const resolvers = {
    Query: {
        // Find a single or multiple users
        users: async (parent, { _id }, context) => {
            if (context.user) {
                const params = _id ? { _id } : {};
                return await User.find(params).populate("friends").populate("activities");
            }
            throw new AuthenticationError("You need to be logged in to use this feature.");
        },

        // Get the profile of the logged in user and populate savedBooks
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id }).populate("friends").populate("activities");
            }
            throw new AuthenticationError("You need to be logged in to use this feature.");
        },
    },

    Mutation: {
        // Login a user with username or email and password (required) and and return the user obj and token
        login: async (parent, { username, email, password }) => {
            const user = await User.findOne({ $or: [{ username }, { email }] });

            if (!user) {
                throw new AuthenticationError("Can't find this user");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Wrong password!");
            }

            const token = signToken(user);
            return { token, user };
        },

        // Create a new user based upon 3 required fields and return the user obj and token
        createUser: async (parent, { username, email, password, shortBio, homeCity }) => {
            const user = await User.create({ username, email, password, shortBio, homeCity });
            const token = signToken(user);
            return { token, user };
        },

        // Edit a user's non required fields (`args`) and return an updated user
        editUser: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    // Spreads the inbound args and matches to the field.
                    { $set: { ...args } },
                    { new: true }
                );
                console.log(user);
                return user;
            }
            throw new AuthenticationError("You need to be logged in to use this feature.");
        },

        // Add a friend to a user and return an updated user
        addFriend: async (parent, { id }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    // `addToSet` only adds to the array if it does not exist
                    { $addToSet: { friends: { _id: id } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in to use this feature.");
        },

        // Remove a friend to a user and return an updated user
        removeFriend: async (parent, { id }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    // `addToSet` only adds to the array if it does not exist
                    { $pull: { friends: { _id: id } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in to use this feature.");
        },

        // Add an activity to a user and return an updated user
        addActivity: async (parent, { id }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    // `addToSet` only adds to the array if it does not exist
                    { $addToSet: { activities: { _id: id } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in to use this feature.");
        },

        // Remove an activity to a user and return an updated user
        removeActivity: async (parent, { id }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    // Equivalent to a where clause in SQL
                    { _id: context.user._id },
                    // `addToSet` only adds to the array if it does not exist
                    { $pull: { activities: { _id: id } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in to use this feature.");
        },


        // Creates a new activity and returns the activity object
        createActivity: async (parent, {name, location, lng, lat, description }) => {
            const activity = await Activity.create({name, location, lng, lat, description});
            return {activity};
        },
        // Adds the participant/user to an activity
        addParticipant: async (parent, { id }, context) => {
            if (context.user) {
                const updatedActivity = await Activity.findOneAndUpdate(
                    { _id: context.user._id },
                    // `addToSet` only adds to the array if it does not exist
                    { $addToSet: { participants: { _id: id } } },
                    { new: true }
                );
                return updatedActivity;
            }
            throw new AuthenticationError("You need to be logged in to use this feature.");
        },
        // removes participant/user from an activity
        removeParticipant: async (parent, { id }, context) => {
            if (context.user) {
                const updatedActivity = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    // `pull` to remove user
                    { $pull: { participants: { _id: id } } },
                    { new: true }
                );
                return updatedActivity;
            }
            throw new AuthenticationError("You need to be logged in to use this feature.");
        },
        


    },
};

module.exports = resolvers;
