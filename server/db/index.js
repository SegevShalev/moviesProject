const mongoose = require('mongoose')

const { DB_USER, DB_PASS, DB_HOST } = process.env
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/movie_db?retryWrites=true&w=majority`

const connect = async () => {
  return mongoose
    .connect(uri)
    .then(() => console.log(` 🍃 mongo-db connected`))
    .catch(console.log)
}

//load_Data

connect()

module.exports = {
  connect,
}
