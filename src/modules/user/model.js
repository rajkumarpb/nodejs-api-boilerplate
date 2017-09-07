import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'
import bcrypt from 'bcrypt-nodejs'

const schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

schema.plugin(timestamps)

// triggers =====================
schema.pre('save', function (next) {
  const user = this

  user.password = user.generateHash(user.password)

  next()
})

// methods ======================
// generating a hash
schema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
schema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const model = mongoose.model('User', schema)
export default model
