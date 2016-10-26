var express = require('express')
var router = express.Router()

var Movie = require ('../models/movie')
var Review = require('../models/review')

// var moviesJSON = require('../movies.json')

router.get('/', function(req, res){

Movie.find({}, function(err, movies){
  res.render('users/movies',{
    moviesArr: movies,
    message: req.flash('loginMessage')
  })
  })
})
//
// router.get('/:id', function(req, res){
//
//   Movie.findById({_id: req.params.id}, function(err, foundmovie){
//     Review.find({movie_id: foundmovie.id},function(err, review) {
//     res.render('movies/movie_individual', {
//       review: review,
//       foundmovie: foundmovie
//       })
//     })
//   })
// })

// router.get('/:id', function (req, res) {
//  Review.findById(req.params.id, function (err, review) {
//    if (err) console.log(err)
//    // foundone review res.send(review)
//
//    res.render('movies/movie_individual', {
//      review: review,
//     //  authUser: req.user,
//     //  checkley: req.user.id
//    })
// })
// })

router.get('/:id', function(req, res){

  Movie.findById({_id: req.params.id}, function(err, foundmovie){
    if(err) console.log(err)

    Review.find({movie_id: req.params.id}, function(err, review){
    if(err) console.log(err)

    res.render('movies/movie_individual', {
      foundmovie: foundmovie,
      reviewArr: review
      })
      })
    })
  })

  router.post('/:movie_id', function (req, res) {
    var newReview = new Review({
      // rating: req.body.rating,
      comment: req.body.user.review,
      user_id: req.user.id,
      movie_id: req.params.movie_id
    })
    newReview.save(function (err, savedReview) {
     res.redirect('/movies/' + newReview.movie_id)
   })
   })

module.exports = router
