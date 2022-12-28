const express = require('express');
const cookieParser = require('cookie-parser');
const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const datasources = require('./datasources');
const createContext = require('./context');

const app = express();
app.use(cookieParser());
const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  dataSources: datasources,
  context: createContext,
});

server.applyMiddleware({ app, path: '/' });
module.exports = app;
