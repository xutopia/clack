import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  local: {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    email: String,
  },
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9), null)
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password)
}

export default mongoose.model('userSchema', userSchema);
