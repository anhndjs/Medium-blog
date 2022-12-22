const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./schemas');
const resolver = require('./resolvers');
const datasources = require('./datasources');
const createContext = require('./context');

const app = express();

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
  }),
  dataSources: datasources,
  context: createContext,
});

server.applyMiddleware({ app, path: '/' });
module.exports = app;
