const mutationResolver = {
  register: (parent, args, context, info) => {
    const user = context.dataSources.user.register(parent, args, context, info);
    return user;
  },
  login: (parent, args, context, info) => {
    const login = context.dataSources.user.Login(parent, args, context, info);
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
    const createPost = context.dataSources.post.createPost(args, context);
    return createPost;
  },
  updatePost: (_, args, { dataSources, authUser }, info) => {
    const updatePost = dataSources.post.updatePost(args, authUser, info);
    return updatePost;
  },
};

module.exports = mutationResolver;
