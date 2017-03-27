require('dotenv').config()

import mongoose from 'mongoose';
require('dotenv').config();
/*
  Connect to our mongo host defined in .env.
  Create a ref to mongo connection names 'store'.
*/

const mongoUri = process.env.MONGO_URI
mongoose.connect(mongoUri)

const db = mongoose.connection;

export default db
