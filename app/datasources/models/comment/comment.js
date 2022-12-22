const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  body: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Posts', required: true },
  likeComments: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Comments', commentSchema);
