const jwt = require('jsonwebtoken');
const User = require('../db/models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('auth-token')
        if(!token) throw new Error()
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: verified._id, 'token': token })
        if (!user) throw new Error()
        req.user = verified
        req.token = token
        next()
    } catch (e) {
        res.status(401).send({ error: "Please authenticate" })
    }
}


module.exports = auth