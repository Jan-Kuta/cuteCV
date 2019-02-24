const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('./auth.controller')

// Setting up the passport middleware for each of the OAuth providers
const twitterAuth = passport.authenticate('twitter', { scope: ['include_email=true']})
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] })
const facebookAuth = passport.authenticate('facebook')
const localAuth = (req, res, strategy) => (passport.authenticate(
  strategy,
  null,
  (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
          message: err.message
      });
    }
  
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
router.get('/twitter/callback', twitterAuth, authController.controller)
router.get('/google/callback', googleAuth, authController.controller)
router.get('/facebook/callback', facebookAuth, authController.controller)

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