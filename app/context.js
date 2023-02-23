const { gql } = require('apollo-server-express');
const { redis } = require('./datasources/utils/redis/stores');
const { scope, throwError, createLoaders } = require('./utils');

async function createContext({ req }) {
  const { query } = req.body;
  const queryAfterParse = gql(query);

  if (scope.guestScope.some(operation => operation === queryAfterParse.definitions[0]
    .selectionSet.selections[0].name.value)) {
    return { loaders: createLoaders() };
  }

  const token = req.headers.authorization;
  const role = await redis.get(token);
  if (!role) {
    throwError('Unauthorized');
  }

  if (role === 'User') {
    if (!scope.userScope.some(operation => operation === queryAfterParse.definitions[0]
      .selectionSet.selections[0].name.value)) {
      throwError('Unauthorized');
    }
  }

  const userId = token.split(':')[1];

  const signature = {
    _id: userId,
    role,
    token,
  };
  return { signature, loaders: createLoaders() };
}

module.exports = createContext;
