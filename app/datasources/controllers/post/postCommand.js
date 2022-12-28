const Post = require('../../models');

async function createPost(title, content, status, authUser) {
  const post = await Post.create({ title, content, status, owner: authUser._id });
}

module.exports = { createPost };
