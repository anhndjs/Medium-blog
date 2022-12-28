const { GraphQLError } = require('graphql');
const bcrypt = require('bcrypt');
const { User } = require('../../models');

async function register(args) {
  try {
    const user = await User.findOne({ email: args.email }).lean();
    if (user) {
      throw new GraphQLError('User already exists', {
        extensions: {
          code: 'FORBIDDEN',
        },
      });
    }
    const password = await bcrypt.hash(args.password, 10);
    const newUser = await User.create({ ...args, password });
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

async function Login(username, password, dataSources, res) {
  try {
    const user = await User.findOne({ username }).lean();
    if (!user) {
      return new Error('not found user');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return new Error('Invalid password');
    }

    const createToken = await bcrypt.hash(`${user}`, 10);
    await dataSources.redis.set(
      `user:${user._id}`,
      JSON.stringify({
        _id: user._id,
        role: user.role,
        status: user.status,
        createToken,
      }),
    );

    res.cookie('token', createToken);
    res.cookie('user', user._id);
    return {
      isSuccess: true,
      message: 'You are logged in',
      token: createToken,
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function DisableUser(id) {
  const user = await User.findOne({ id }).lean();

  if (!user) {
    return new Error('user not found');
  }

  await User.findByIdAndUpdate(user, { status: 'Deactivated', id });
}
module.exports = {
  register,
  Login,
  DisableUser,
};
