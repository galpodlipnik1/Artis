import mongoose from 'mongoose';

const savedImageSchema = mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('SavedImage', savedImageSchema);
