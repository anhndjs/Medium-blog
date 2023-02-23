const grapqlFields = require('graphql-fields');
const _ = require('lodash');
const { throwError } = require('../../../utils');
const logger = require('../../../utils/logger');
const { User } = require('../../models');
const { findOne } = require('../../models/comment');
const { getSelectedFieldsWithoutRecursive } = require('../../utils/controllers');

async function getMe(parent, args, context, info) {
  try {
    const { signature } = context;
    const { id } = signature;
    // take the requests of user
    const fields = getSelectedFieldsWithoutRecursive(info.fieldNodes[0].selectionSet.selections);

    const user = await User.findOne({ id }).select(fields).lean();

    return user;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throwError('Internal server error');
  }
}

async function getUser(parent, args, context, info) {
  try {
    const { input } = args;
    const { id, username, email } = input;
    const fields = Object.keys(grapqlFields(info));
    const user = await User.findOne({
      id,
      username,
      email,
    }, { email: 1 }).select(fields).lean();
    return user;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throwError('Internal server error');
  }
}

async function getUsers(parent, args, context, info) {
  try {
    const { username } = args;
    const fields = Object.keys(grapqlFields(info));

    const users = await User.find({
      firstName: username,
    }).select(fields).lean();
    return users;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throwError('Internal server error');
  }
}

module.exports = {
  getUser,
  getMe,
  getUsers,
};
