const postCommand = require('./postCommand');
const postQuery = require('./postQuery');

module.exports = {
  ...postCommand,
  ...postQuery,
};
