require('dotenv').config()
const express = require('express')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const socketio = require('socket.io')
const bodyParser = require('body-parser')
const authRouter = require('./lib/auth.router')
const passportInit = require('./lib/passport.init')
const emailController = require('./email/email.controller')
const resetPasswordController = require('./lib/resetPassword.controller')
const { CLIENT_ORIGIN } = require('./config')
const app = express()
const { schema } = require('./schema/schema')

// Accept requests from our client
app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true
})) 

app.set('port', 8080)

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passportInit();
app.use('/', authRouter)

app.get('/', (req, res) => {
  res.send('Cute API');
})

app.get('/logout', (req, res) => {
  req.logout();
  return res.json({ message: 'Logged out succesfully' });
})

// sends confirmation email
app.post('/forgot-password', emailController.forgotPassword)

// email confirmation
app.get('/email/confirm/:uuid', emailController.confirmEmail)

app.post('/reset-password', resetPasswordController.controller)

schema.applyMiddleware({app, cors: {origin: CLIENT_ORIGIN}})

const server = app.listen(app.get('port'), () => {
  console.log(`Find the server at port:${app.get('port')}/`); // eslint-disable-line no-console
});

// Connecting sockets to the server and adding them to the request 
// so that we can access them later in the controller
const io = socketio(server)
app.set('io', io)