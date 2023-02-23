const controllers = require('./controllers');
const redis = require('./redis');

module.exports = {
  ...controllers,
  ...redis,
};
