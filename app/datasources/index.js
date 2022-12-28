const mongoose = require('mongoose');
const config = require('../config');
const { redis } = require('./utils/redis/stores');
require('./models');
const controllers = require('./controllers');
const loaders = require('./loaders');

if (config.nodeEnv !== 'test') {
  mongoose.set('strictQuery', true);
  mongoose.connect(config.mongo.database, config.mongo.options, err => {
    if (err) {
      logger.info(`mongodb connection failed ${err}`);
    } else {
      logger.info('hello from mongodb');
    }
  });
}

module.exports = () => ({ ...controllers, loaders, redis });
