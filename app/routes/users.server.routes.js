var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
    app.route('/users')
        .post(users.create)
        .get(users.list);

    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);

    app.param('userId', users.userByID);

        
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);

    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));

    app.route('/mobileSignup')
        .post(users.mobileSignup);
    

    //Returns user object if user is sucessfully authenticated, "unauthorized" if user is not
    app.route('/mobileSignin')
        .post(passport.authenticate('local'), function (req, res){
            res.send(req.user);
        });

    app.get('/signout', users.signout);


    //Routes for facebook oauth
    app.get('/oauth/facebook', passport.authenticate('facebook', {
        failureRedirect: '/signin',
        scope: ['email']
    }));

    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));


    //Routes for twitter oauth
    app.get('/oauth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }));
    app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));


    //Routes for google oauth
    app.get('/oauth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
    }));
    app.get('/oauth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));
};
