require('dotenv').config();

module.exports = {
  mongo: {
    database: process.env.DB_CONNECTION_STRING,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
