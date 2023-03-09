import mongoose from 'mongoose';

const feedbackSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageData: {
    type: String,
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

export default mongoose.model('Feedback', feedbackSchema);
