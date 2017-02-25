import mongoose from 'mongoose';

const channel = mongoose.Schema({
  name: { type: String, unique: true },
  id: String,
  private: Boolean,
  members: Array
});

export default mongoose.model('Channel', channel);
