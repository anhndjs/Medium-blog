const grapqlFields = require('graphql-fields');
const { Post } = require('../../models');
const { throwError } = require('../../../utils');
const createGeneralResponse = require('../../utils/controllers/createGeneralResponse');

async function createPost(parent, args, context, info) {
  try {
    const { title, content, status } = args;
    const { signature } = context;

    const post = new Post({
      title,
      content,
      owner: signature._id,
      status,
    });

    return post.save();
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}

async function updatePost(parent, args, context, info) {
  try {
    const { id, title, content, status } = args.input;

    const { signature } = context;

    const findPost = await Post.findByIdAndUpdate({ id, owner: signature._id }, { title, content, status }, { returnDocument: 'after' });
    return findPost;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}

async function deletePost(parent, args, context, info) {
  try {
    const { signature } = context;

    const { _id } = args;
    // const post = await Post.findByIdAndUpdate({ _id: id, owner: signature._id });
    const findPost = await Post.findByIdAndDelete({ _id, owner: signature._id }, { status: 1 }).lean();
    if (!findPost || findPost.status === 'Deleted') {
      return createGeneralResponse(false, 'Delete post failed');
    }
    findPost.status = 'Deleted';
    return findPost;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}

async function hidePost(parent, args, context, info) {
  try {
    const { _id } = args;
    const { signature } = context;
    const post = await Post.findOne({
      _id,
      owner: signature._id,
    }, { status: 1 });
    if (!post || post.status === 'Deleted' || post.status === 'Hidden') {
      return createGeneralResponse(false, 'hide post failed');
    }
    post.status = 'Hidden';
    await post.save();
    return createGeneralResponse(true, 'hide post succedd');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}
module.exports = { createPost, updatePost, deletePost, hidePost };
