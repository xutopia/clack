import mongoose from 'mongoose';
require('dotenv').config();
/*
  Connect to our mongo host defined in .env.
  Create a ref to mongo connection names 'store'.
  Resolve get and set side effects.
*/

export default function db() {
  mongoose.connect(process.env.MONGO_URI);
  const store = mongoose.connection;
  return new Promise(resolve => {
    store.once('open', () => {
      resolve({
        get: get(store),
        set: set(store),
      });
    });
  });
}
