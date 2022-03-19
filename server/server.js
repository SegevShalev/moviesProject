require('dotenv').config()
require('./db/index')
const express = require('express')
const userRouter = require('./routers/user-router')
const moviesRouter = require('./routers/movies-router')
const cors = require('cors');


const app = express()
const PORT = process.env.PORT || 8080
//middlewares
app.use(cors({
    origin:'*'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routers

app.use('/',userRouter)
app.use('/watch',cors({
    origin:'*'
}), moviesRouter) 



const server = app.listen(PORT, () => console.log(`🕎 server is on port ${PORT}`))
module.exports = { app, server }
