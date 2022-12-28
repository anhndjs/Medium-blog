const { redis } = require('./datasources/utils/redis/stores');

async function createContext({ req, res }) {
  return { req, res, authUser: await getScope(req) };
}

async function getScope(req) {
  const { user, token } = req.cookies;
  if (!user || !token) { return null; }

  const userRedis = await redis.get(`user:${user}`);
  if (!userRedis) { return null; }

  const { status } = JSON.parse(userRedis);

  if (status !== 'Active') {
    throw new Error('you cannot authorized');
  }

  return userRedis;
}
module.exports = createContext;
