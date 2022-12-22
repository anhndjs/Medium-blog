const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['User', 'Admin'], default: 'Users' },
  flower: { type: [Schema.Types.ObjectId], ref: 'Users' },
  flowing: { type: [Schema.Types.ObjectId], ref: 'Users' },
  password: { type: String, required: true },
  LikedPosts: { type: [Schema.Types.ObjectId], ref: 'Blog' },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
}, { timestamps: true });

module.exports = mongoose.model('Users', UserSchema);
