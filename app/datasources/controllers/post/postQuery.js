const grapqlFields = require('graphql-fields');
const { Post } = require('../../models');
const { throwError } = require('../../../utils');

async function findPost(parent, args, context, info) {
  try {
    // find id of a post
    const { id } = args;

    const fields = Object.keys(grapqlFields(info));
    // return
    const post = await Post.findOne({ id }).select(fields).lean();
    return post;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}

async function findPosts(parent, args, context, info) {
  const { input } = args;

  const { owner, title, limit, offset } = input;

  const fields = Object.keys(grapqlFields(info));

  const posts = await Post.find({
    owner,
    title,
    limit,
    offset,
  }).select(fields).lean();
  return posts;
}

module.exports = {
  findPost,
  findPosts,
};
