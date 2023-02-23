const getSelectedFields = require('./getSelectedFields');
const createGeneralResponse = require('./createGeneralResponse');

module.exports = {
  ...getSelectedFields,
  ...createGeneralResponse,
};
