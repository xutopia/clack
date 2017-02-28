import mongoose from 'mongoose';

/*
  Connect to our mongo host defined in .env.
  Create a ref to mongo connection names 'store'.
*/

const mongoPort = process.env.MONGO_PORT || 61049
const mongoHost = process.env.MONGO_HOSTNAME || 'ds161049.mlab.com'
const options = {
  user: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD
}

mongoose.connect(mongoHost, 'clack', mongoPort, options)

const db = mongoose.connection;

export default db
