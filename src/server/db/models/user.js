import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

const User = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  email: String
});

User.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9), null)
}

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', User);
