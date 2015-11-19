var passport = require('passport'),
    url = require('url'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');


module.exports = function() {
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            passReqToCallback: true,
            profileFields: ['id', 'emails', 'name', 'displayName'/*, 'picture.type(large)'*/]
        },
        function(req, accessToken, refreshToken, profile, done) {
            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;
            var providerUserProfile = {
           			// we can also get gender and profile picture - picture.type(large)
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                fullName: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                provider: 'facebook',
                providerId: profile.id,
                providerData: providerData
            };
            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }));
};
