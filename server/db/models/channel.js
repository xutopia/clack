import mongoose from 'mongoose';

const Channel = mongoose.Schema({
  id: String,
  name: { type: String, unique: true },
  private: Boolean,
  members: Array
});

export default mongoose.model('Channel', Channel);
