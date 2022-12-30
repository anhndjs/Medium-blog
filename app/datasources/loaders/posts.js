const { Post } = require('../models');

async function batchPosts(ids) {
  console.log('batchPosts', ids);
  const posts = await Post.find({ _id: { $in: ids } })
    .select('_id')
    .lean();
  return ids.map(id => posts.find(post => post._id.toString() === id));
}
module.exports = { batchPosts };
