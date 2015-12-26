module.exports = {
    db: process.env.DB, //no local fallback
    sessionSecret: process.env.SESSION_SECRET,
    facebook: {
        clientID: process.env.FACE_CLIENT_ID,
        clientSecret: process.env.FACE_CLIENT_SECRET,
        callbackURL: 'https://squawk-staging.herokuapp.com/oauth/facebook/callback'
    },
    aws: {
        accessKeyID: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: 'us-east-1',
        bucket: 'parakeet-uploads'
    }

};
