const usercommand = require('./userCommand');
const userquery = require('./userQuery');

module.exports = {
  ...usercommand,
  ...userquery,
};
