// Import Signing & Authentication libraries
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

// Import Mongoose data model
const { User } = require("../models");

const resolvers = {
    Query: {
        // Find a single or multiple users
        users: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return await User.find(params).populate("savedActivities");
        },

        // Get the profile of the logged in user and populate savedBooks
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id }).populate("savedActivities");
            }
            throw new AuthenticationError("You need to be logged in!");
        },
    },

    Mutation: {
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

        // Create a new user based upon 3 required fields and return the user obj and token
        editUser: async (parent, args, context) => {
            console.log(context.user._id);
            console.log(args.shortBio);
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $set: { ...args } },
                    { new: true });
                console.log(user);
                return user;
            }
            throw new AuthenticationError("You need to be logged in to use this feature.");
        },
    },
};

module.exports = resolvers;
