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
        .get(authenticator.check, users.getUser)
        //update
        .put(authenticator.currentUserOrAdmin, users.update)
        .delete(authenticator.currentUserOrAdmin, users.delete);


    app.route(root + 'fulluser')
        .get(authenticator.check, users.userWithRequests);

    app.route(root + 'signup')
        .post(users.signup);

    app.route(root + 'signin')
        .post(passport.authenticate('local'), function(req, res) {
            //res.send(req.user);
            var token = jwt.sign(req.user, config.jwtSecret);
            res.json({
                success: true,
                token: 'JWT ' + token
            });
        });

    app.get('/signout', users.signout);


    //Routes for facebook oauth
    app.get('/oauth/facebook', passport.authenticate('facebook', {
        failureRedirect: '/',
        scope: ['email']
    }));

    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/',
        successRedirect: '/oauth/facebook/token'
    }));

    app.get('/oauth/facebook/token',
        function(req, res) {
            var token = jwt.sign(req.user, config.jwtSecret);
            res.json({
                success: true,
                token: 'JWT ' + token
            });
        });


    //Route for token based facebook
    app.get('/auth/facebook/token', passport.authenticate('facebook-token'),
        function(req, res) {
            //res.sendStatus(req.user? 200 : 401);
            var token = jwt.sign(req.user, config.jwtSecret);
            res.json({
                success: true,
                token: 'JWT ' + token
            });
            //res.json(req.user);
        }
    );



    // app.post('/tokenauthenticate', function(req, res) {
    //   User.findOne({
    //     name: req.body.name
    //   }, function(err, user) {
    //     if (err) throw err;

    //     if (!user) {
    //       res.send({success: false, msg: 'Authentication failed. User not found.'});
    //     } else {
    //       // check if password matches
    //       user.comparePassword(req.body.password, function (err, isMatch) {
    //         if (isMatch && !err) {
    //           // if user is found and password is right create a token
    //           var token = jwt.sign(user, config.secret);
    //           // return the information including token as JSON
    //           res.json({success: true, token: 'JWT ' + token});
    //         } else {
    //           res.send({success: false, msg: 'Authentication failed. Wrong password.'});
    //         }
    //       });
    //     }
    //   });
    // });
































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
