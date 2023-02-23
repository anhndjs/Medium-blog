const { createClient } = require('redis');

const redis = createClient();

async function test() {
  await redis.connect();
}

test();

redis.on('error', err => console.log('Redis Client Error', err));
redis.on('connect', () => console.log('Redis Client  connect'));

module.exports = { redis };
