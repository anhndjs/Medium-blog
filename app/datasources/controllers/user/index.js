const userquery = require('./userQuery');
const usercommand = require('./userCommand');

module.exports = {
  ...userquery,
  ...usercommand,
};
