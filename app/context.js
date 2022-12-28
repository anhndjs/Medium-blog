const { parse } = require('graphql');
const { redis } = require('./datasources/utils/redis/stores');

async function createContext({ req, res }) {
  return { req, res, authUser: await getScope(req) };
}

async function getScope(req) {
  const { user, token } = req.cookies;
  console.log(token);
  if (!user || !token) { return null; }

  const userRedis = await redis.get(`user:${user}`);
  if (!userRedis) { return null; }

  const { status } = JSON.parse(userRedis);

  if (status !== 'Active') {
    throw new Error('you cannot authorized');
  }
  const { query } = req.body;
  const ast = parse(`${query}`);
  // console.log(ast.definitions[0].selectionSet.selections[0]);

  return userRedis;
}
module.exports = createContext;
