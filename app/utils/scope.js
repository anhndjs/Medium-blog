const guestScope = [
  'register', 'login', 'users', 'posts', 'post', 'replies',
];

const userScope = [
  'users', 'posts', 'post', 'me', 'replies',
  'follow', 'unfollow', 'createPost', 'updatePost', 'deletePost', 'hidePost',
  'clapPost', 'unclapPost', 'clapComment', 'unclapComment', 'comment', 'updateComment',
  'reply', 'deleteComment',
];

module.exports = {
  guestScope,
  userScope,
};
