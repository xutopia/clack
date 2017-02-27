import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const SALT_FACTOR = 10

const userSchema = mongoose.Schema({
  local: {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    email: String,
  },
});

const noop = () => {};

userSchema.pre('save', (done) => {
  const user = this;
  if (!user.isModified('password')) {
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return done(err);
    }
    bcrypt.hash(user.password, salt, noop, (err, hashedPassword) => {
      if (err) {
        return done(err);
      }
      user.password = hashedPassword;
      done();
    });
  });
});

userSchema.methods.getUserName = () => this.username;
userSchema.methods.checkPassword = (guess, done) => {
  bcrypt.compare(guess, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};

export default mongoose.model('userSchema', userSchema);
