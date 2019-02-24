const providers = ['twitter', 'google', 'facebook']

const callbacks = providers.map(provider => {
  return `${process.env.SERVER_URL}/${provider}/callback`
})

const [twitterURL, googleURL, facebookURL] = callbacks

exports.CLIENT_ORIGIN = process.env.CLIENT_URL

exports.TWITTER_CONFIG = {
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
  callbackURL: twitterURL,
}

exports.GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_KEY,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: googleURL
}

exports.FACEBOOK_CONFIG = {
  clientID: process.env.FACEBOOK_KEY,
  clientSecret: process.env.FACEBOOK_SECRET,
  profileFields: ['id', 'emails', 'name', 'picture.width(250)'],
  callbackURL: facebookURL
}
