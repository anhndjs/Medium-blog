const { Follow } = require('../../models');

async function follower(followee, authUser) {
  const { _id } = JSON.parse(authUser);
  const user = await Follow.findOne({ followee, follower: _id }).lean();

  if (user) {
    throw new Error('you has been follow');
  }
  await Follow.create({ follower: _id, followee });
  return {
    isSuccess: true,
    message: 'follow success',
  };
}

async function unfollow(followee, authUser) {
  const { _id } = JSON.parse(authUser);
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
