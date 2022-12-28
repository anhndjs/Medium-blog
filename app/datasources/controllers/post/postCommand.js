const Post = require('../../models');

async function createPost(title, content, status, authUser) {
  const post = await Post.create();
}

module.exports = { createPost };
