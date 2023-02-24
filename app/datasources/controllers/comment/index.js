const comment = require('./commentComman');
const commentQuery = require('./commentQuery');

module.exports = {
  ...comment,
  ...commentQuery,
};
