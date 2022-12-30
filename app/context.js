const { parse } = require('graphql');
const _ = require('lodash');
const { redis } = require('./datasources/utils/redis/stores');
const { createLoader } = require('./loader');

async function createContext({ req }) {
  const token = req.headers.authorization;

  if (!token) {
    return null;
  }

  const userID = token.split(':')[1];

  const role = await redis.get(token);

  const { query } = req.body;
  const ast = parse(`${query}`);

  const topFields = ast.definitions[0]
    .selectionSet
    .selections
    .map(field => field.name.value);

  const adminOnlyFields = ['user', 'disableUser'];
  const authFields = ['me', 'user', 'disableUser', 'logout', 'follow', 'unfollow', 'createPost', 'updatePost', 'deletePost', 'hidePost', 'clapPost', 'unclapPost', 'comment', 'updateComment', 'reply', 'deleteComment'];

  // if (_.difference(topFields, authFields).length === topFields.length) {
  //   // all fields in topFields is not in authFields
  // } else if (_.difference(topFields, adminOnlyFields).length === topFields.length) {
  //   // all fields is not in adminOnlyFields
  // } else if (role !== 'Admin') {
  //   throw new Error(' no premion');
  }
  const user = {
    userID,
    role,
    token,
    loader: createLoader(),
  };
  return { user };
}

module.exports = createContext;
