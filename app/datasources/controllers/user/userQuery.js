const grapqlFields = require('graphql-fields');
const logger = require('../../../utils/logger');
const { User } = require('../../models');

async function getMe(context) {
  try {
    const { user } = context;
    if (!user) {
      return {
        isSuccess: false,
        message: 'Invalid credentials',
      };
    }
    const me = await User.findById(user.userID).lean();

    return me;
  } catch (error) {
    logger.error('get me error', { error: error.stack });
    throw error;
  }
}

async function getuser(args, context, info) {
  try {
    const { input } = args;

    const { _id, username, email } = input;

    const selected = Object.keys(grapqlFields(info));

    const getUser = await User.findOne({ _id, username, email }, selected).lean();

    return getUser;
  } catch (error) {
    throw new Error(error);
  }
}

async function getusers(args, info) {
  try {
    const { username } = args;
    console.log(username);
    const selected = Object.keys(grapqlFields(info));
    console.log(selected);
    const user = await User.find({ username }, selected).lean();
    console.log(user);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getuser,
  getMe,
  getusers,
};
