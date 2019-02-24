const { gql, ApolloServer } = require('apollo-server-express');
const { merge } = require('lodash');
const { typeDef: User, resolvers: userResolvers } = require('./user');
const { typeDef: UserInfo, resolvers: userInfoResolvers } = require('./userInfo');
const { typeDef: Skill, resolvers: skillResolvers } = require('./skill');
const { typeDef: Education, resolvers: educationResolvers } = require('./education');
const { typeDef: Work, resolvers: workResolvers } = require('./work');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const prisma = require('../prisma');

const Default = gql`
  type Query {
    _empty: String
  }

  type Mutation {
      _empty: String
  }
`;

const resolvers = {};

module.exports = {schema: new ApolloServer({
    typeDefs: importSchema('schema/schema.graphql'),
    resolvers: merge(resolvers, userResolvers, userInfoResolvers), //, skillResolvers, educationResolvers, workResolvers)
    context: ({req, res}) => {
      console.log("requesre: ", req.user);
      return {
        user: req.user,
        prisma
      };
    },
    playground: {
      endpoint: 'graphql',
      settings: {
        'editor.theme': 'dark'
      }
    }
})};