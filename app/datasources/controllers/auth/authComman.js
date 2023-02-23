const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { User } = require('../../models');
const { throwError } = require('../../../utils');
const { createLoginResponse } = require('../../utils/controllers/Auth');

async function register(_, args, context, info) {
  try {
    // get all args
    const { username, email, password } = args;

    const user = await User.findOne({ email, username });

    if (user) {
      throwError('User or email already exists');
    }
    // hash password when user req
    const hashPassword = await bcrypt.hash(password, 10);
    const createUser = await User.create({ username, email, password: hashPassword });
    return createUser;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}
async function login(_, args, context, info) {
  try {
    // find user exists in the db
    const { username, password } = args;

    const findUser = await User.findOne({ username }).lean();

    if (!findUser) {
      throwError(' customer does not exist');
    }

    const comparePassword = await bcrypt.compare(password, findUser.password);
    // comparepassword
    if (comparePassword === false) {
      throwError('incorrect password');
    }
    // Check if your account is locked
    if (findUser.status === 'Deactivated') {
      throwError('Your account has been locked');
    }
    // create token
    const randomString = crypto.randomBytes(30).toString('hex');

    const token = `${randomString}:${findUser._id}`;
    // save token in redis and time end
    await context.dataSources.redis.set(`${token}`, `${findUser.role}`, { EX: 86400 });
    return createLoginResponse(true, 'Login succeed', token, findUser);
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return createLoginResponse(false, 'Internal server error', null, null);
  }
}
module.exports = {
  register,
  login,
};
