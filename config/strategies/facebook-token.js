var passport = require('passport'),
    //url = require('url'),
    FacebookTokenStrategy = require('passport-facebook-token');
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');


module.exports = function() {
    passport.use(new FacebookTokenStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            profileFields: ['id', 'emails', 'name', 'displayName', 'picture.type(large)']
        },
        function(accessToken, refreshToken, profile, done) {
            console.log(profile);
            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;
            var providerUserProfile = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                fullName: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                provider: 'facebook',
                providerId: profile.id,
                providerData: providerData,
                userImg:profile._json.picture.data.url
            };
            users.tokenSaveOAuthUserProfile(providerUserProfile, done);
        }));
};
