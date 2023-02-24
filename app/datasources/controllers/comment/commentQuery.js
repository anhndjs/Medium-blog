const grapqlFields = require('graphql-fields');
const { Comment, Post } = require('../../models');
const { throwError } = require('../../../utils');

async function replies(parent, args, context, info) {
  try {
    const { input } = args;
    const { commentId, limit, offset } = input;
    const field = Object.keys(grapqlFields(info));

    const comment = await Comment.find({
      parent: commentId,
    }).select(field).limit(limit).offset(offset)
      .lean();
    return comment;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}
module.exports = { replies };
