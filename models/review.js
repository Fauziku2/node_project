var mongoose = require('mongoose')

var reviewSchema = new mongoose.Schema({
  comment: String,
  time: {
    type: Date,
    default: Date.now
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }
})

var Review = mongoose.model('Review', reviewSchema)

module.exports = Review
