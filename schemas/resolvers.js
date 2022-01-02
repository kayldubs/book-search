const { User, Book } = require('../server/models');
const { authenticationError } = require('apollo-server-express');
const { signToken } = require('../server/utils/auth');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                return userData;
            }
            throw new authenticationError('Please Log in');
        }
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.finOne( { email });
            if(!user) {
                throw new authenticationError('Incorrect Email')
            }
            const rightPassword = await user.isCorrectPassword(password);
            if(!rightPassword) {
                throw new authenticationError('Incorrect Password')
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async(parent, { bookId }, context) => {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                )
                return updatedUser;
            }
        }
    }
};

module.exports = resolvers