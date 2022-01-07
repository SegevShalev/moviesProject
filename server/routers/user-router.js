const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')

const {createUser,loginUser,logoutUser,deleteUser} =  require('../controllers/users-controller')

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/logout', auth, logoutUser) 
router.delete('/delete', auth, deleteUser)



module.exports = router