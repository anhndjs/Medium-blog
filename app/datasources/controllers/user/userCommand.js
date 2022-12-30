const { GraphQLError } = require('graphql');
const bcrypt = require('bcrypt');
const { User } = require('../../models');

async function register(parent, args, context, info) {
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

async function Login(parent, args, context, info) {
  try {
    const user = await User.findOne({ username: args.username }).lean();
    if (!user) {
      return {
        isSuccess: false,
        message: 'Invalid credentials',
      };
    }

    const valid = await bcrypt.compare(args.password, user.password);

    if (!valid) {
      return {
        isSuccess: false,
        message: 'Invalid credentials',
      };
    }

    const createToken = await bcrypt.hash(`${user}`, 10);
    await context.dataSources.redis.set(
      `${createToken}:${user._id}`,
      JSON.stringify({
        role: user.role,
      }),
    );

    const token = `${createToken}: ${user._id}`;
    return {
      isSuccess: true,
      message: 'You are logged in',
      token,
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function DisableUser(parent, args, context, info) {
  try {
    const { id } = args;
    const user = await User.findById(id).lean();

    await User.findByIdAndUpdate(user._id, { status: 'Deactivated' }, { new: true });
    let cursor = 0;

    do {
      const resultOfScan = await context.dataSources.redis.scan(cursor, 'MATCH', `*${id}`, 'COUNT', '1');
      cursor = resultOfScan[0];
      if (resultOfScan) {
        await context.dataSources.redis.lPush(resultOfScan[1]);
      }
    } while (cursor !== '0');
    console.log('went here!');
    return {
      isSuccess: true,
    };
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  register,
  Login,
  DisableUser,
};
