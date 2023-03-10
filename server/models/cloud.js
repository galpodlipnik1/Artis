import mongoose from 'mongoose';

const cloud = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Untitled'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('cloud', cloud);
