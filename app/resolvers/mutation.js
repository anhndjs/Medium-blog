const mutationResolver = {
  register: (_, { email, username, password }, { dataSources, authScope }) => {
    const user = dataSources.user.register({ email, username, password, authScope });
    return user;
  },
  login: (_, { username, password }, { dataSources, res }) => {
    const login = dataSources.user.Login(username, password, dataSources, res);
    return login;
  },
  disableUser: (_, { id }, { dataSources }) => {
    const user = dataSources.user.DisableUser(id);
    return user;
  },
  follow: (_, { followee }, { dataSources, authUser }) => {
    const follows = dataSources.follow.follower(followee, authUser);
    return follows;
  },
  unfollow: (_, { followee }, { dataSources, authUser }) => {
    const unfollow = dataSources.follow.unfollow(followee, authUser);
    return unfollow;
  },
  // POST
  createPost: (_, { title, content, status }, { dataSources, authUser }) => {
    const createPost = dataSources.post.createPost(title, content, status, authUser);
    return createPost;
  },
};

module.exports = mutationResolver;
