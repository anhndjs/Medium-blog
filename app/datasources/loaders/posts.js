const mongoose = require('mongoose');
const { User, Post, Clap } = require('../models');

async function batchClapCountOfPost(ids) {
  try {
    console.log(ids);
    const newIds = ids.map(id => mongoose.Types.ObjectId(id));
    const clapCount = await Clap.aggregate([
      {
        $match: { post: { $in: newIds } },
      },
      {
        $group: {
          _id: '$post',
          count: { $sum: '$count' },
        },
      },
    ]);
    const clapCountMap = {};
    clapCount.forEach(item => {
      clapCountMap[item._id.toString()] = item.count;
    });
    return ids.map(id => clapCountMap[id] || 0);
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throw err;
  }
}

async function batchOwnerOfPost(ids) {
  try {
    console.log(ids);
    const users = await User.find({
      _id: { $in: ids },
    }).lean();
    const usersMap = {};
    users.forEach(user => {
      usersMap[user._id.toString()] = user;
    });
    return ids.map(id => usersMap[id]);
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    throw err;
  }
}

module.exports = {
  batchClapCountOfPost,
  batchOwnerOfPost,
};
