const MoviesService = require('../services/movies-services')

async function getMovies(req, res) {
  try {
    const movies = await MoviesService.getAllMovies()
    let data = movies.results.map((item) => {
      return { id: item.id, title: item.title || item.name, media_type: item.media_type,poster:item.backdrop_path }
    })
    return res.status(200).json(data)
  } catch (err) {
    return err
  }
}

async function getMovie(req, res) {
  
    const movie = await MoviesService.getInfo(req.body.id, req.body.media_type)
    const networks = await MoviesService.getAvailability(req.body.id, req.body.media_type)

    const movieInfo = {
      id: req.body.id,
      title: req.body.title,
      media_type: req.body.media_type,
      homepage: movie.homepage,
      overview: movie.overview,
      poster: movie.poster_path,
      release_date: movie.release_date || movie.first_air_date,
      stream:networks.results?.US?.link  || 'no streaming available' 
    }
    return res.status(200).json(movieInfo)
    
}

async function addMovie (req, res) {
  const token = req.header('auth-token')
  const movieData = {id:req.body.id,mediaType:req.body.media_type}
  await MoviesService.addMovie(token, movieData)
  return res.status(200).json('added: '+req.body.title)
}

async function removeMovie (req, res) {
  const token = req.header('auth-token')
  const movieData = {id:req.body.id,mediaType:req.body.media_type}
  await MoviesService.removeMovie(token, movieData)
  return res.status(200).json('removed: '+req.body.title)
}

async function getList(req, res) {
  const token = req.header('auth-token')
  const list = await MoviesService.userList(token)
  
  return res.status(200).json({list,total:list.length})

}

module.exports = { getMovies, getMovie,addMovie,removeMovie,getList }
