var express = require('express')
var router = express.Router()
var passport = require('passport')

var User = require('../models/user')

function authCheck (req, res, next) {
  // if req.isAuthenticated is false, then let it be

  // if it's true, redirect back to profile

  if (req.isAuthenticated()) {
    req.flash('signupMessage', 'You have logged in!')
    return res.redirect('/movies') // profile need to change-redirect
  } else {
    return next()
  }
}

// signup for ajax??
router.get('/signup-ajax', function (req, res) {
  User.find({}, function (err, allUsers) {
    console.log(allUsers)
    res.render('users/index', {
      allUsers: allUsers
    })
  })
})

// why .get takes in authCheck??
router.route('/signup')
      .get(authCheck, function (req, res) {
        User.find({}, function (err, allUsers) {
          res.render('users/index-passport', {
            allUsers: allUsers,
            message: req.flash('signupMessage')
          })
        })
      })
      .post(passport.authenticate('local-signup', {
        successRedirect: '/movies',
        failureRedirect: '/signup',
        failureFlash: true
      }))

router.route('/login')
      .get(authCheck,function (req, res) {
        res.render('users/login', { message: req.flash('loginMessage') })
      })
      .post(passport.authenticate('local-login', {
        successRedirect: '/movies',
        failureRedirect: '/login',
        failureFlash: true
      }))

router.get('/error', function (req, res) {
  res.render('users/error')
})

// router.get('/movies', function (req, res) {
//   // res.send(req.user)
//
//   res.render('users/movies', { message: req.flash('loginMessage') })
// })

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})

module.exports = router
