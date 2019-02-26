const passport = require('passport')
const bcrypt = require('bcryptjs')
const { Strategy: LocalStrategy} = require('passport-local')
const { Strategy: TwitterStrategy } = require('passport-twitter')
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth')
const { Strategy: FacebookStrategy } = require('passport-facebook')
const { 
  TWITTER_CONFIG, GOOGLE_CONFIG, FACEBOOK_CONFIG
} = require('../config')
const prisma = require('../prisma')
const hashPassword = require('../utils/hashPassword')
const userSerialize = require('../utils/userSerialize')

module.exports = () => {  

  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb) => cb(null, user))
  passport.deserializeUser((obj, cb) => cb(null, obj))
  
  // Saves user to the database if not exists
  const getUserOrCreate = async (user, cb) => {
    let dbUser = await prisma.query.user({where: {username: user.username}}, `
      {
        _id
        username
        displayName
        photoUrl
        blocked
        ${user.provider}Provider
      }`);
      
      if (dbUser) {
        if (dbUser.blocked) {
          return cb(new Error("User Account Blocked"), null);
          // return cb(null, false, {message: 'User Account Blocked'})
        }
        
        if (!dbUser[`${user.provider}Provider`]) {
          // first login/registration by this provider -> update account
          const gqlUpdate = {
            data: {},
            where: {
              _id: dbUser._id,
          }};
          gqlUpdate.data[`${user.provider}Provider`] = true;
          if (!dbUser.photoUrl) {
            gqlUpdate.data.photoUrl = user.photoUrl
          }
          dbUser = await prisma.mutation.updateUser(gqlUpdate)
        }
      } else {
        // new account created
        const gqlCreate = {
          data: {
            username: user.username,
            displayName: user.displayName,
            photoUrl: user.photoUrl
          }
        }
        gqlCreate.data[`${user.provider}Provider`] = true;
        dbUser = await prisma.mutation.createUser(gqlCreate);
      }
      return cb(null, userSerialize(dbUser));
  };

  // The callbacks that are invoked when an OAuth provider sends back user 
  const twitterCallback = async (accessToken, refreshToken, profile, cb) => {
    const user = {
      displayName: profile.username,
      username: profile.emails && profile.emails[0].value,
      photoUrl: profile.photos[0].value.replace(/_normal/, ''),
      provider: 'twitter'
    };

    return getUserOrCreate(user, cb);
  };

  const googleCallback = async (accessToken, refreshToken, profile, cb) => {
    const user = {
      displayName: profile.displayName,
      username: profile.emails[0].value,
      photoUrl: profile.photos[0].value.replace(/sz=50/gi, 'sz=250'),
      provider: 'google'
    };
    return getUserOrCreate(user, cb);
  }

  const facebookCallback = async (accessToken, refreshToken, profile, cb) => {
    const user = {
      displayName: `${profile.name.givenName} ${profile.name.familyName}`,
      username: profile.emails[0].value,
      photoUrl: profile.photos[0].value,
      provider: 'facebook'
    };
    return getUserOrCreate(user, cb);
  };

  // Adding each OAuth provider's strategy to passport
  // Twitter login
  passport.use(new TwitterStrategy(TWITTER_CONFIG, twitterCallback))
  
  // Google login
  passport.use(new GoogleStrategy(GOOGLE_CONFIG, googleCallback))
  
  // Facebook login
  passport.use(new FacebookStrategy(FACEBOOK_CONFIG, facebookCallback))

  // Local login
  passport.use('local-login', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    async (username, password, done) => {
      if (username) {
        username = username.toLocaleLowerCase();
      }
      const user = await prisma.query.user({
        where: {
          username: username
        }
      });
      if (!user || !user.localProvider) {
        return done(new Error('Unable to login'), null, 'Unable to login');
      }

      if (!user.confirmed){
        return done(new Error('Confirm your email to login'), null, 'Confirm your email to login');
      }

      if (user.blocked) {
        return done(new Error('Your account is blocked'), null, 'Your account is blocked');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(new Error('Unable to login'), null,'Unable to login');
      }
    
      return done(null, userSerialize(user));
    }) 
  )

  // Local register
  passport.use(
    'local-register',
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const { username } = req.body;
      if (email) {
        email = email.toLowerCase();
      }
      const user = await prisma.query.user({where: {username: email}});
      
      // Already registered by local provider
      if (user && user.localProvider) {
        done(new Error('Already registered with this e-mail.'), null)
      }

      // Do the registration
      const hashedPassword = await hashPassword(password);
      let result = null;

      // Already registered but wit other provider
      if (user) {
        result = await prisma.mutation.updateUser({
          data: {
            password: hashedPassword,
            localProvider: true,
            confirmed: true // TODO JKU - overit email
          },
          where: {
            _id: user._id
          }
        });
      } 
      // New registration
      else {
        result = prisma.mutation.createUser({
          data: {
            username: email,
            displayName: username,
            password: hashedPassword,
            localProvider: true,
            confirmed: true, // TODO JKU - overit email
            blocked: false
          }
        });
      }

      return done(null, userSerialize(result));
    }) 
  )
  
}