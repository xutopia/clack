import mongoose from 'mongoose';

const channel = mongoose.Schema({
  id: String,
  name: { type: String, unique: true },
  private: Boolean,
  members: Array
});

export default mongoose.model('Channel', channel);
