const queryResolver = {
  user: (parent, args, context, info) => {
    const user = context.dataSources.user.user(parent, args, context, info);
    return user;
  },

  posts: (parent, args, context, info) => {
    const user = context.dataSources.post.Posts(parent, args, context, info);
    return user;
  },

};

module.exports = queryResolver;
