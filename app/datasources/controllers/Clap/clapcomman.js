const { User, Post, Clap, Comment } = require('../../models');
const createGeneralResponse = require('../../utils/controllers/createGeneralResponse');
const { throwError } = require('../../../utils');

// const Clap = require('../../models/Clap');

async function clapPost(parent, args, context, info) {
  try {
    const { postId, count } = args;
    const { signature } = context;
    const post = await Post.findOne({ _id: postId });

    if (!post || post.status === 'Hidden' || post.status === 'Draft' || post.status === 'Deleted') {
      return createGeneralResponse(false, 'Clap post failed');
    }
    const clap = await Clap.findOne({ user: signature._id, post: postId });

    if (!clap) {
      const newClap = new Clap({
        user: signature._id,
        post: postId,
        postOwner: post.owner,
        count,
      });
      newClap.save();
      return createGeneralResponse(true, 'Clap post true');
    }
    await Clap.updateOne({
      user: signature._id,
      post: postId,
    }, { $inc: { count } });
    return createGeneralResponse(true, 'Clap post succeed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}

async function unclapPost(parent, args, context, info) {
  try {
    const { postId } = args;
    const { signature } = context;

    const clap = await Clap.findOne({ user: signature._id, post: postId });
    console.log(clap);
    if (clap) {
      await clap.deleteOne({ user: signature._id, post: postId });
      return createGeneralResponse(true, 'unClappost true');
    }

    return createGeneralResponse(false, 'unClappost failed');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}

async function clapComment(parent, args, context, info) {
  try {
    const { commentId, count } = args;

    const { signature } = context;

    const findComment = await Comment.findOne({ _id: commentId }).lean();

    if (!findComment) {
      return createGeneralResponse(false, 'clapcomment false');
    }

    const clap = await Clap.findOne({
      user: signature._id,
      comment: commentId,
    }).lean();

    if (!clap) {
      const newClap = new Clap({
        user: signature._id,
        comment: commentId,
        count,
      });
      await newClap.save();
      return createGeneralResponse(true, 'clap comment succedd');
    }
    await Clap.updateOne({
      user: signature._id,
      comment: commentId,
    }, { $inc: { count } });
    return createGeneralResponse(true, 'clap comment succedd');
  } catch (err) {
    logger.error(`${err.message}\n ${err.stack}`);
    return throwError('Internal server error');
  }
}
module.exports = {
  clapPost,
  unclapPost,
  clapComment,
};
