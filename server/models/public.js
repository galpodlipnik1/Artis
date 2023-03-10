import mongoose from 'mongoose';

const publicSchema = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cloud',
    required: true
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cloud',
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cloud',
    required: true
  },
  likes: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('public', publicSchema);
