const axios = require('axios')
const KEY = process.env.API_KEY
const tmdbUri = 'https://api.themoviedb.org/3'
const User = require('../db/models/user')
//https://image.tmdb.org/t/p/original/[poster_path]

async function getAllMovies() {
  console.log('Getting all movies')
  // return [...allMovies]
  // return await Movie.find()
  let movies = (await axios.get(`${tmdbUri}/trending/all/week?api_key=${KEY}`)).data
  return movies
}

async function getInfo(id, mediaType) {
  console.log('getting info...')
  let movie = (await axios.get(`${tmdbUri}/${mediaType}/${id}?api_key=${KEY}`)).data
  return movie
}

async function getAvailability(id, mediaType) {
  console.log('getting availability...')
  let providers = (await axios.get(`${tmdbUri}/${mediaType}/${id}/watch/providers?api_key=${KEY}`)).data
  return providers
}

async function addMovie(token, data) {
  const user = await getUserByToken(token)
  user.movieList.push(data)
  await user.save()
  return
}

async function removeMovie(token, data) {
  const user = await getUserByToken(token)
  const result = user.movieList.filter((item) => {
    if (item.id !== data.id || item.mediaType !== data.mediaType) return item
  })
  user.movieList = result
  await user.save()
  return
}

async function userList(token){
  const user = await getUserByToken(token)
  return user.movieList
  
}

async function getUserByToken(token) {
  const user = await User.findOne({ token })
  if (!user) {
    throw new Error('Auth failed ')
  }
  return user
}

module.exports = { getAllMovies, getInfo,getAvailability, addMovie, removeMovie,userList }
