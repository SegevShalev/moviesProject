const UsersService = require('../services/users-services')
const { regitserValidation, loginValidation } = require('../middlewares/validation')
const User = require('../db/models/user')

async function createUser(req, res, next) {
  const { error } = regitserValidation(req.body)
  if (error) return res.status(400).send('Your Data is not valid!')
  const { name, email, password } = req.body

  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('user already exists')
  try {
    const user = await UsersService.createUser(name, email, password)
    console.log('new user:', user)
    const token = await UsersService.generateUserToken(user)
    res.header('auth-token', token)
    res.status(201).send({ user })
  } catch (e) {
    next(e)
  }
}
async function loginUser(req, res, next) {
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send('Your Data is not valid!')
  try {
    const { email, password } = req.body
    const user = await UsersService.findUser(email, password)
    const token = await UsersService.generateUserToken(user)
    res.header('auth-token', token)

    res.status(200).send({ user })
  } catch (e) {
    next(e)
  }
}

async function logoutUser(req, res, next) {
  try {
    const { email, password } = req.body
    const user = await UsersService.findUser(email, password)
    const logOutUser = await UsersService.cleanToken(user)
    res.status(200).send({ logOutUser })
  } catch (e) {
    next(e)
  }
}

async function deleteUser(req, res, next) {
  try {
    const { email, password } = req.body
    const user = await UsersService.findUser(email, password)
    const countDeleted = parseInt(await UsersService.deleteUser(user))
    if (countDeleted>0) {
      res.status(200).send({ userDeleted: req.user })
    } else {
      throw Error(`Failed to delete user ${req.user.id}`)
    }
  } catch (e) {
    next(e)
  }
}
module.exports = { createUser, loginUser, logoutUser, deleteUser }
