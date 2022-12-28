const { parse } = require('graphql');
const { redis } = require('./datasources/utils/redis/stores');
const { User } = require('./datasources/models');

async function createContext({ req, res }) {
  return { req, res, authUser: await getScope(req) };
}

async function getScope(req) {
  const { user, token } = req.cookies;
  if (!user || !token) { return null; }

  const userRedis = await redis.get(`${token}:${user}`);
  if (!userRedis) { return null; }
  const { status } = User.findById({ user });

  if (status !== 'Active') {
    throw new Error('you cannot authorized');
  }
  const { query } = req.body;
  const ast = parse(`${query}`);
  // console.log(ast.definitions[0].selectionSet.selections[0]);

  return userRedis;
}
module.exports = createContext;
