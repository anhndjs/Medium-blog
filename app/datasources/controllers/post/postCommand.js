const { Post } = require('../../models');

async function createPost(title, content, status, authUser) {
  try {
    const _id = JSON.parse(authUser);
    const post = await Post.create({ title, content, status, owner: _id });
    return post;
  } catch (error) {
    throw new Error(error);
  }
}

async function updatePost(args, authUser, info) {
  try {
    console.log(info);
    // const owner = await Post.populate('owner');
    // console.log(owner);
    const _id = JSON.parse(authUser);
    const { id, title, content, status } = args.input;
    const updatePosts = await Post.findByIdAndUpdate(id, { title, content, status, owner: _id }, { new: true });
    return updatePosts;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { createPost, updatePost };
