const queryResolver = {
  me: (parent, args, context, info) => {
    const user = context.dataSources.user.getMe(parent, args, context, info);
    return user;
  },
  user: (parent, args, context, info) => {
    const user = context.dataSources.user.getUser(parent, args, context, info);
    return user;
  },
  users: (parent, args, context, info) => {
    const user = context.dataSources.user.getUsers(parent, args, context, info);
    return user;
  },
  post: (parent, args, context, info) => {
    const post = context.dataSources.post.findPost(parent, args, context, info);
    return post;
  },
  posts: (parent, args, context, info) => {
    const post = context.dataSources.post.findPosts(parent, args, context, info);
    return post;
  },
};

module.exports = queryResolver;
