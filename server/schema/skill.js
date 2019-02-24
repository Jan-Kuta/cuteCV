const { gql } = require('apollo-server-express');

module.exports = {
    typeDef: gql`
        extend type Query {
            skill(_id: ID!): Skill
        }

        extend type Mutation {
            createSkill(
                title: String,
                level: Int,
                note: String
            ): Skill
        }

        type Skill {
            _id: ID!
            title: String,
            level: Int,
            note: String,

            user: User
        }
    `,
    resolvers: {
        Query: {
            // skill: async (root, { _id }) => prepareObject(await Skills.findOne(ObjectId(_id)))
        },
        Skill: {
        },
        Mutation: {
        /*createSkill: async (root, args, { userId }, info) => {
            if (!userId) {
            throw new Error('User not logged in.');
            }
            args.userId = userId;
            const { insertedId } = await Skills.insertOne(args);
            return prepareObject(await Skills.findOne(ObjectId(insertedId)));
        }*/
        },
    }
};
