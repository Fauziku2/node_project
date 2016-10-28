var express = require('express')
var router = express.Router()

var Movie = require('../models/movie')
var Review = require('../models/review')

// var moviesJSON = require('../movies.json')

router.get('/', function (req, res) {
  if (!req.isAuthenticated())
     res.redirect('/login')
  Movie.find({}, function (err, movies) {
    if (err) console.log(err)
    res.render('users/movies', {
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

router.get('/:id', function (req, res) {

  // if (!req.isAuthenticated())
  //  res.redirect('/signup')

  Movie.findById(req.params.id, function (err, foundmovie) {
    if (err) console.log(err)

    Review.find({movie_id: req.params.id}, function (err, review) {
      if (err) console.log(err)

      res.render('movies/movie_individual', {
        foundmovie: foundmovie,
        reviewArr: review,
        currentUser: req.user.id,
        nowUser: req.user
      })
    })
  })
})

router.post('/:movie_id', function (req, res) {

  // if (!req.isAuthenticated())
  //  res.redirect('/signup')

  var newReview = new Review({
      // rating: req.body.rating,
    comment: req.body.user.review,
    user_id: req.user.id,
    movie_id: req.params.movie_id
  })
  newReview.save(function (err, savedReview) {
    if (err) console.log(err)
    res.redirect('/movies/' + newReview.movie_id)
  })
})

router.get('/:movie_id/reviews/:id/edit', function (req, res) {
  if (!req.isAuthenticated())
   res.redirect('/signup')

  Movie.findById(req.params.movie_id, function (err, foundmovie) {
    if (err) console.log(err)

    Review.findById(req.params.id, function (err, editReview) {
      if (err) console.log(err)

      console.log(editReview)

      res.render('movies/movie_edit', {
        foundmovie: foundmovie,
        editReview: editReview
      })
    })
  })
})

// router.get('/:id/edit', function (req, res) {
//   Review.findById(req.params.id, function (err, editReview) {
//     if (err) console.log(err)
//     res.render('movies/movie_edit', {
//       editReview: editReview
//
//     })
//     console.log(editReview)
//   })
// })

router.post('/:movie_id/reviews/:id/edit', function (req, res) {

  Review.findById(req.params.id, function (err, editReview) {
    if (err) console.log(err)
    editReview.comment = req.body.user.review

    editReview.save(function (err, currentReview) {
      if (err) console.log(err)
      res.redirect('/movies/' + editReview.movie_id)

    })
  })
})
// router.put(':id/edit', function (req, res) {
//   var editReview = req.body.user.review
//   console.log('edit: ' + editReview)
//   Review.findByIdAndUpdate(req.param.id, editReview, function (err, editRev) {
//     if (err) throw new Error(err)
//     res.redirect('/movies/' + req.params.movie_id)
//   })
// })

router.delete('/:movie_id/reviews/:id', function (req, res) {
  Review.findByIdAndRemove(req.params.id, function (err, movreview) {
    if (err) {
      res.send('Error!')
      console.log(err)
    } else {
      res.redirect('/movies/' + req.params.movie_id)
    }
    // res.send(success)
  })
})

module.exports = router
