var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var morgan = require('morgan')

var flash = require('connect-flash')
var session = require('express-session')

var passport = require('passport')
var MongoStore = require('connect-mongo')(session)

var dotenv = require('dotenv')
var methodOverride = require('method-override')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.' + process.env.NODE_ENV })

mongoose.connect(process.env.MONGO_URI)

// app.use(methodOverride('_method'))

app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(layout)
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoReconnect: true
  })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// serve static files
app.use(express.static(__dirname + '/public'))



var usersRoutes = require('./routes/users')
var usersAPIRoutes = require('./routes/users_api')
var movieRoutes = require('./routes/movies')
// var reviewRoutes = require('./routes/reviews')

app.use(bodyParser.json()) // to parse ajax json req
app.use(bodyParser.urlencoded({
  extended: true
})) // to parse form submitted data

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

// this middleware allow you to access user in every ejs page
// need to put above the app.use routes
app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})

require('./config/passport')(passport)

app.use('/', usersRoutes) // only render ejs files
app.use('/api/users', usersAPIRoutes) // only handle ajax request
app.use('/movies', movieRoutes)
// app.use('/movies/:id', reviewRoutes)

app.listen(process.env.PORT || 5000)
console.log('Listening to port 5000, server started')
