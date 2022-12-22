const server = require('./server');
const mongo = require('./mongodb');
const redis = require('./redis');

module.exports = {
  ...server,
  ...mongo,
  ...redis,
};
