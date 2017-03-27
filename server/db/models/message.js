import mongoose from 'mongoose'

const Message = mongoose.Schema({
  id: String,
  channelID: String,
  text: String,
  username: Object,
  timeStamp: String
})

export default mongoose.model('Message', Message)
