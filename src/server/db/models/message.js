import mongoose from 'mongoose'

const message = mongoose.Schema({
  id: String,
  channelID: String,
  text: String,
  username: Object,
  timeStamp: String
})

export default mongoose.model('message', message)
