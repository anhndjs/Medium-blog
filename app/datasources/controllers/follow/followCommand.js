const { Follow } = require('../../models');

async function follower(args, context) {
  const { _id } = JSON.parse(context.authUser);
  const user = await Follow.findOne({ followee: args.followee, follower: _id }).lean();

  if (user) {
    throw new Error('you has been follow');
  }
  await Follow.create({ follower: _id, followee: args.followee });
  return {
    isSuccess: true,
    message: 'follow success',
  };
}

async function unfollow(args, context) {
  const { _id } = JSON.parse(context.authUser);
  const user = await Follow.findOne({ followee, follower: _id }).lean();
  if (user) {
    await Follow.findOneAndDelete({ followee });
  }

  return {
    isSuccess: true,
    message: 'unfollow success',
  };
}

module.exports = { follower, unfollow };
