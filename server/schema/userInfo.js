const { gql } = require('apollo-server-express');
const { prepareObject } = require('./commons');

module.exports = { 
    typeDef: gql`
        extend type Query {
            userInfo(_id: ID!): UserInfo
        }

        extend type Mutation {
            createUserInfo(
                username: String,
                firstname: String,
                lastname: String,
                image: String,
                birthdate: String,
                email: String,
                phone: String,
                drivingLicence: String,
                address: String,
                linkedinAccount: String,
                webpage: String
            ): UserInfo
        }

        type UserInfo {
            _id: ID!
            userId: ID!
            username: String
            firstname: String
            lastname: String
            image: String
            birthdate: String
            email: String
            phone: String
            drivingLicence: String
            address: String
            linkedinAccount: String
            webpage: String

            user: User
        }
    `,
    resolvers: {
        Query: {
            // userInfo: async (root, { _id }) => prepareObject(await UserInfos.findOne(ObjectId(_id)))
        },
        UserInfo: {
        },
        Mutation: {
            /*createUserInfo: async (root, args, { userId }, info) => {
                if (!userId) {
                throw new Error('User not logged in.');
                }
                args.userId = userId;
                const { insertedId } = await UserInfos.insertOne(args);
                return prepareObject(await UserInfos.findOne(ObjectId(insertedId)));
            }*/
        },
    }
};
