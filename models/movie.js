var mongoose = require('mongoose')

var movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    description: String,
    poster: String,
    background_image: String,
    trailer: String
})

var Movie = mongoose.model('Movie', movieSchema , 'movies')// 'movies' is for mongoDB to recognise

module.exports = Movie
