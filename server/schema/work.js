const { gql } = require('apollo-server-express');

module.exports = {
    typeDef: gql`
        extend type Query {
            work(_id: ID!): Work
        }

        extend type Mutation {
            createWork(
                startDate: String,
                endDate: String,
                company: String,
                position: String,
                type: String,
                address: String,
                webpage: String,
                notes: String
            ): Work
        }

        type Work {
            _id: ID!
            startDate: String,
            endDate: String,
            company: String,
            position: String,
            type: String,
            address: String,
            webpage: String,
            notes: String,

            user: User
        }
    `,
    resolvers: {
        Query: {
        //work: async (root, { _id }) => prepareObject(await Works.findOne(ObjectId(_id)))
        },
        Work: {
        },
        Mutation: {
        /*createWork: async (root, args, { userId }, info) => {
            if (!userId) {
            throw new Error('User not logged in.');
            }
            args.userId = userId;
            const { insertedId } = await Works.insertOne(args);
            return prepareObject(await Works.findOne(ObjectId(insertedId)));
        }*/
        },
    }
};
