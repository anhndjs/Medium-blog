const grapqlFields = require('graphql-fields');
const { Post } = require('../../models');

async function Posts(args, context, info) {
  try {
    const { input } = args;
    const { owner, title, limit, offset } = input;

    const selected = Object.keys(grapqlFields(info));

    const filter = {
      title: new RegExp(title, 'i'),
      status: 'Visible',
    };
    if (owner) filter.owner = owner;
    const posts = await Post.find(filter, selected).skip(offset).limit(limit).lean();
    return {
      isSuccess: true,
      posts,
    };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  Posts,
};
