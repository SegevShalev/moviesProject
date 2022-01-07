const express = require('express')
const auth = require('../middlewares/auth')

const {getMovies,getMovie,addMovie,removeMovie,getList} = require('../controllers/movies-controller')

const moviesRouter = express.Router()

moviesRouter.get('/',getMovies)//get trending
moviesRouter.post('/',addMovie)//+auth
moviesRouter.delete('/',removeMovie)//+auth

// movieRouter.get('/:param')//search for a movie

moviesRouter.get('/info',getMovie) //get info on a specific movie/show 

moviesRouter.get('/list',getList)//get user list //+auth




module.exports = moviesRouter