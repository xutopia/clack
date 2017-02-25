import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const user = mongoose.Schema({
  local: {
    username: { type: String, unique: true },
    password: String,
    email: String
  }
})

user.methods.generateHash = password => {
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

user.methods.isValidPassword = password => {
  bcrypt.compareSync(password, this.local.password)
}

export default mongoose.model('user', user)
