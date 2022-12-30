const queryResolver = {
  me: (parent, args, context, info) => {
    const user = context.dataSources.user.getMe(context);
    return user;
  },

  user: (parent, args, context, info) => {
    const user = context.dataSources.user.getuser(args, context, info);
    return user;
  },

  users: (parent, args, context, info) => {
    const user = context.dataSources.user.getusers(args, context, info);
    return user;
  },

  posts: (parent, args, context, info) => {
    const post = context.dataSources.post.Posts(parent, args, context, info);
    return post;
  },

};

module.exports = queryResolver;
