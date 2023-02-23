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

module.exports = { comment };
