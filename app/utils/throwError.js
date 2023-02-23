const { GraphQLError } = require('graphql');

function throwError(message) {
  throw new GraphQLError(message);
}

module.exports = throwError;
