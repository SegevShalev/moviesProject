const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  admin:{
    type: Boolean,
    default: false,
  },
  Permissions:{
    type: Boolean,
    default: false,
  },
  movieList:{
    type: Array
  },
 
  token: String,
})

userSchema.methods.generateAuthToken = async function () {
  console.log('Generating Token..')
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
  console.log('here!', token)
  user.token = token
  await user.save()
  return token
}

const User = mongoose.model('User', userSchema)

module.exports = User