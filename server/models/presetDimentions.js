import mongoose from 'mongoose';

const presetDimentionsSchema = mongoose.Schema({
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
  dimensionX: {
    type: Number,
    required: true
  },
  dimensionY: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('PresetDimentions', presetDimentionsSchema);
