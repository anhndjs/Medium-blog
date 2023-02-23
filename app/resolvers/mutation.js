const mutationResolver = {
  register: (parent, args, context, info) => {
    const user = context.dataSources.auth.register(parent, args, context, info);
    return user;
  },
  login: (parent, args, context, info) => {
    const login = context.dataSources.auth.login(parent, args, context, info);
    return login;
  },
  disableUser: (parent, args, context, info) => {
    const user = context.dataSources.user.DisableUser(parent, args, context, info);
    return user;
  },
  follow: (parent, args, context, info) => {
    const follows = context.dataSources.follow.follower(args, context);
    return follows;
  },
  unfollow: (parent, args, context, info) => {
    const unfollow = context.dataSources.follow.unfollow(args, context);
    return unfollow;
  },
  // POST
  createPost: (parent, args, context, info) => {
    const createPost = context.dataSources.post.createPost(parent, args, context, info);
    return createPost;
  },
  updatePost: (parent, args, context, info) => {
    const updatePost = context.dataSources.post.updatePost(parent, args, context, info);
    return updatePost;
  },
  deletePost: (parent, args, context, info) => {
    const deletePost = context.dataSources.post.deletePost(parent, args, context, info);
    return deletePost;
  },
  hidePost: (parent, args, context, info) => {
    const hidePost = context.dataSources.post.hidePost(parent, args, context, info);
    return hidePost;
  },
  clapPost: (parent, args, context, info) => {
    const clapPost = context.dataSources.Clap.clapPost(parent, args, context, info);
    return clapPost;
  },
  unclapPost: (parent, args, context, info) => {
    const unclapPost = context.dataSources.Clap.unclapPost(parent, args, context, info);
    return unclapPost;
  },
  clapComment: (parent, args, context, info) => {
    const unclapPost = context.dataSources.Clap.unclapPost(parent, args, context, info);
    return unclapPost;
  },
  comment: (parent, args, context, info) => {
    const comment = context.dataSources.comment.comment(parent, args, context, info);
    return comment;
  },
};

module.exports = mutationResolver;
