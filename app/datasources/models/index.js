const Comment = require('./comment/comment');
const Post = require('./post/Post');
const User = require('./user/User');
const Follow = require('./follow/Follow');

const models = {
  Comment,
  Post,
  User,
  Follow,
};

module.exports = models;
