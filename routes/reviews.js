var express = require('express')
var router = express.Router()

var Review = require ('../models/review')
var Movie = require('../models/movie')

// router.post('/:id', function(req, res){
//   Movie.findById({_id: req.params.id}, function(err, movie){
//     var newReview = new Review({
//       comment: req.body.user.review,
//       movie_id: movie.id
//     })
//     newReview.save(function(err, savedReview){
//       // res.send(savedReview)
//        res.redirect('/' + req.param.id)
//     })
//   })
// })

// router.post('/:movie_id', function (req, res) {
//   var newReview = new Review({
//     // rating: req.body.rating,
//     comments: req.body.user.review,
//     // user_id: req.user.id,
//     // movie_id: req.params.movie_id
//   })
//   console.log(req.body.user.review)
//   newReview.save(function (err, savedReview) {
//    res.redirect('/' + newReview.movie_id)
//  })
//  })
//
// module.exports = router
