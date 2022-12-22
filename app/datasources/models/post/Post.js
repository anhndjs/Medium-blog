const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  countLike: { type: Number, default: 0 },
  likePost: { type: mongoose.Schema.ObjectId, ref: 'Users' },
  comment: [{ type: mongoose.Schema.ObjectId, ref: 'Comments' }],
}, { timestamps: true });

module.exports = mongoose.model('Posts', postSchema);
