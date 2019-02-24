const { gql } = require('apollo-server-express');

module.exports = { 
    resolvers: {
        Query: {
            me: async (root, args, { user, prisma }, info) => {
                console.log(user);
                if (!user || !user.username) {
                    return null;
                }
                const res = await prisma.query.users({where: {username: user.username}}, info);
                console.log(res);
                if (res.length == 0){
                    return null;
                }
                return res[0];
            },
        }
    },
    typeDef: gql`
        extend type Query {
            me: User
        }

        type User {
            _id: ID!
        }
    `
};
