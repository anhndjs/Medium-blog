const { GraphQLError } = require('graphql');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../../models');
const { throwError } = require('../../../utils');
const { createLoginResponse } = require('../../utils/controllers/Auth');

async function DisableUser(parent, args, context, info) {
  try {
    const { id } = args;
    // search user
    const user = await User.findOne({ _id: id }, { status: 1 });
    if (!user) {
      return createLoginResponse(false, ' User not found');
    }
    if (user.status === 'Deactivated') {
      return createLoginResponse(false, ' User has been locked');
    }

    let cursor = 0;

    do {
      const resultOfScan = await context.dataSources.redis.scan(cursor, 'MATCH', `*${user._id}`, 'COUNT', '10');
      cursor = resultOfScan[0];
      if (resultOfScan) {
        console.log(resultOfScan);
        await context.dataSources.redis.del(resultOfScan[1]);
      }
    } while (cursor !== '0');

    user.status = 'Deactivated';
    await user.save();
    return createLoginResponse(true, 'Disable user succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}
module.exports = {

  DisableUser,
};
