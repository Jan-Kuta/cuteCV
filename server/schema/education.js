const { gql } = require('apollo-server-express');

module.exports = {
    typeDef: gql`
        extend type Query {
            education(_id: ID!): Education
        }

        extend type Mutation {
            createEducation(
                startDate: String,
                endDate: String,
                schoolName:String,
                faculty: String,
                major: String,
                degree: String,
                thesis:String
            ): Education
        }

        type Education {
            _id: ID!
            startDate: String,
            endDate: String,
            schoolName:String,
            faculty: String,
            major: String,
            degree: String,
            thesis:String,

            user: User
        }
    `,
    resolvers: {
        Query: {
        //education: async (root, { _id }) => prepareObject(await Educations.findOne(ObjectId(_id)))
        },
        Education: {
        },
        Mutation: {
        /*createEducation: async (root, args, { userId }, info) => {
            if (!userId) {
            throw new Error('User not logged in.');
            }
            args.userId = userId;
            const { insertedId } = await Educations.insertOne(args);
            return prepareObject(await Educations.findOne(ObjectId(insertedId)));
        }*/
        },
    }
};
