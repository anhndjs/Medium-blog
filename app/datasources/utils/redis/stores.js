// // const redis = require('redis');
// // const bluebird = require('bluebird');

// // const config = require('../../../config');

// // bluebird.promisifyAll(redis.RedisClient.prototype);

// // const authenticateStore = redis.createClient(config.redisDbs.authDb);

// // module.exports = {
// //   authenticateStore,
// // };
// const Redis = require('ioredis');
// const { redisDbs } = require('../../../config');

// const redisModel = new Redis({
//   host: redisDbs.authDb.host,
//   port: redisDbs.authDb.port,
//   password: redisDbs.authDb.auth_pass,
// });

// redisModel.on('connect', () => {
//   console.log('Redis client connected');
// });
// redisModel.on('error', err => {
//   console.log(`Something went wrong ${err}`);
// });
// redisModel.on('shutdown', () => {
//   console.log('Redis client shutdown');
// });

// module.exports = redisModel;
const { createClient } = require('redis');

const redis = createClient();

async function test() {
  await redis.connect();
}

test();

redis.on('error', err => console.log('Redis Client Error', err));
redis.on('connect', () => console.log('Redis Client  connect'));

module.exports = {
  redis,
};
