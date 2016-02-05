var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport'),
    root = '/api/v1/',
    jwt = require('jsonwebtoken'),
    config = require('../../config/config'),
    authenticator = require('../../app/controllers/authenticator.server.controller');

module.exports = function(app) {
    app.route(root + 'users')
        //create
        // .post(users.create)
        //index
        .get(authenticator.check, users.list);

    app.route(root + 'users/:userId')
        //show
        .get(authenticator.check, users.getUser);
    //update
    //.put(authenticator.currentUserOrAdmin, users.update)
    //.delete(authenticator.currentUserOrAdmin, users.delete);

    app.route(root + 'currentuser')
        .get(authenticator.getCurrent, users.userWithRequests)
        .put(authenticator.getCurrent, users.update)
        .delete(authenticator.getCurrent, users.delete);

    app.route(root + 'signup')
        .post(users.signup);

    app.route(root + 'signin')
        .post(passport.authenticate('local'), users.localSignIn);

    app.get(root + 'authenticatedStatus', authenticator.check , users.authenticateStatus);

    app.get('/signout', users.signout);


    //Routes for facebook oauth
    app.get('/oauth/facebook', passport.authenticate('facebook', {
        failureRedirect: '/',
        scope: ['email']
    }));

    app.get('/oauth/facebook/callback', passport.authenticate('facebook'), function(req, res) {
        var tokenCookie = jwt.sign(req.user.toObject(), config.jwtSecret);
        res.cookie('token', tokenCookie, {
            path: '/main/'
        }).redirect('/main/');
    });



    //Route for token based facebook
    app.get('/auth/facebook/token', passport.authenticate('facebook-token'), users.localSignIn);




















    // ////////////////////////////////////////////////////////

    //             UNUSED OAUTH ROUTES                       //

    // ////////////////////////////////////////////////////////

    //     //Routes for twitter oauth
    //     app.get('/oauth/twitter', passport.authenticate('twitter', {
    //         failureRedirect: '/signin'
    //     }));
    //     app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
    //         failureRedirect: '/signin',
    //         successRedirect: '/'
    //     }));


    //     //Routes for google oauth
    //     app.get('/oauth/google', passport.authenticate('google', {
    //         failureRedirect: '/signin',
    //         scope: [
    //             'https://www.googleapis.com/auth/userinfo.profile',
    //             'https://www.googleapis.com/auth/userinfo.email'
    //         ],
    //     }));
    //     app.get('/oauth/google/callback', passport.authenticate('google', {
    //         failureRedirect: '/signin',
    //         successRedirect: '/'
    //     }));
};
