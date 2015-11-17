module.exports = {
  // Development configuration options
  db: 'mongodb://localhost/squawker',
  sessionSecret: 'thisguywhowrotethisbookisagenius',
  facebook: {
  	clientId: '108032549563495',
  	clientSecret: 'fd5a36493b2344d748b97a17ba3ea0be',
  	callbackURL: 'http://localhost:3000/oauth/facebook/callback'
  }
};