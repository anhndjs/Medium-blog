const user = require('./user');
const follow = require('./follow/followCommand');
const post = require('./post');
const auth = require('./auth');
const Clap = require('./Clap');
const comment = require('./comment');

module.exports = {
  user,
  follow,
  post,
  auth,
  Clap,
  comment,
};
