const User = require('./../db/models/user')
const bcrypt = require('bcryptjs')

async function createUser(name, email, password) {
    const hashPass = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password:hashPass,movieList:[] })
    const savedUser = await user.save()
    return user
}

async function generateUserToken(user) {
    return await user.generateAuthToken()
}

async function findUser(email, password) {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login(email) ')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login(pass) ')
    }   
    return user
}

async function cleanToken(user) {
    console.log(user)
    user.token = undefined
    return await user.save()

}

async function deleteUser(user) {
    const {deletedCount} = await User.deleteOne({ _id: user.id })
    console.log("happy",deletedCount)
    return deletedCount
}


module.exports = {
    createUser,generateUserToken,
    findUser,
    cleanToken,deleteUser,

}