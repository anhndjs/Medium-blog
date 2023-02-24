const grapqlFields = require('graphql-fields');
const { User, Post, Clap, Comment } = require('../../models');
const createGeneralResponse = require('../../utils/controllers/createGeneralResponse');
const { throwError } = require('../../../utils');

async function comment(parent, args, context, info) {
  try {
    const { input } = args;

    const { postId, ...content } = input;

    const { signature } = context;

    const newCommen = new Comment({
      post: postId,
      user: signature._id,
      ...content,
    });

    return newCommen.save();
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}

async function updateComment(parent, args, context, info) {
  try {
    const { input } = args;

    const { commentId, title, content } = input;

    const { signature } = context;

    const fields = Object.keys(grapqlFields(info));

    const updateComments = await Comment.findOneAndUpdate(
      { _id: commentId, user: signature._id },
      { title, content },
      { returnDocument: after },
    ).select(fields);

    if (!updateComment) {
      throwError('new error');
    }

    return updateComments;
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}

async function reply(parent, args, context, info) {
  try {
    const { signature } = context;

    const { input } = args;

    const { commentId, ...content } = input;

    const commentInDB = await Comment.findOne({
      _id: commentId,
    }, { _id: 1, post: 1 }).lean();

    if (!commentInDB) {
      throwError('reply comment failed');
    }

    const newReplyComment = new Comment({
      ...content,
      user: signature._id,
      post: commentInDB.post,
      parent: commentId,
    });

    return newReplyComment.save();
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}

async function deleteComment(parent, args, context, info) {
  try {
    const { _id } = args;

    const { signature } = context;

    const removeComment = await Comment.findByIdAndDelete({ _id, user: signature._id });

    if (!removeComment) {
      return {
        isSuccess: false,
        message: 'Unauthorized!',
      };
    }

    return createGeneralResponse(true, 'delete success');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}
module.exports = { comment, updateComment, reply, deleteComment };
