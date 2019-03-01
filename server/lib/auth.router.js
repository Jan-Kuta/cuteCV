const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('./auth.controller')

// Setting up the passport middleware for each of the OAuth providers
const twitterAuth = (req,res, next) => (
  passport.authenticate(
    'twitter',
    { scope: ['include_email=true']},
    (err, user) => authController.controller(req, res, 'twitter', user, err)
  )(req, res, next)
)

const googleAuth = (req, res, next) => (
  passport.authenticate(
    'google',
    { scope: ['profile', 'email'] },
    (err, user) => (
      authController.controller(req, res, 'google', user, err)
    )
  )(req, res, next)
)

const facebookAuth = (req, res, next) => (
  passport.authenticate(
    'facebook',
    null,
    (err, user) => authController.controller(req, res, 'facebook', user, err)
  )(req, res, next)
)

const localAuth = (req, res, strategy) => (passport.authenticate(
  strategy,
  null,
  (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
          message: err.message
      });
    }
  
    // for registration do not login
    if(req.url.toLowerCase() === '/register'){
      if (res.finished) {
        return;
      }
      return res.status(201).json({
        message: 'User created, please check the e-mail.'
      });
    }

    req.login(user, null, (err) => {
      if (err) {
          res.send(err);
      }
      // return user in response
      return res.json(user);
    });
  })(req, res));
  

// Routes that are triggered by the callbacks from each OAuth provider once 
// the user has authenticated successfully
router.get('/twitter/callback', twitterAuth)
router.get('/google/callback', googleAuth)
router.get('/facebook/callback', facebookAuth)

// This custom middleware allows us to attach the socket id to the session
// With that socket id we can send back the right user info to the right 
// socket
router.use((req, res, next) => {
  req.session.socketId = req.query.socketId
  next()
})

// Routes that are triggered on the client
router.get('/twitter', twitterAuth)
router.get('/google', googleAuth)
router.get('/facebook', facebookAuth)
router.post('/login', (req, res) => localAuth(req, res, 'local-login'))
router.post('/register', (req, res) => localAuth(req, res, 'local-register'))

module.exports = router