const { Post } = require('../../models');

async function createPost(args, context) {
  try {
    const { title, content, status } = args;
    const { user } = context;
    const post = await Post.create({ title, content, status, owner: user.userID });
    return {
      isSuccess: true,
      message: 'create post success',
      post,
    };
  } catch (error) {
    throw new Error(error);
  }
}

async function updatePost(args, authUser, info) {
  try {
    const _id = JSON.parse(authUser);

    const { id, title, content, status } = args.input;

    const updatePosts = await Post.findByIdAndUpdate(id, { title, content, status, owner: _id }, { new: true });

    return {
      isSuccess: true,
      message: 'update success',
      updatePosts,
    };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { createPost, updatePost };
