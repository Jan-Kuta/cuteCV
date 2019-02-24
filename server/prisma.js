const { Prisma } = require('prisma-binding');

const prisma = new Prisma({
    typeDefs: 'schema/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET
});

module.exports = prisma;