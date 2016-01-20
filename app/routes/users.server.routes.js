var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport'),
    root = '/api/v1/';

module.exports = function(app) {
    app.route(root + 'users')
        //create
        // .post(users.create)
        //index
        .get(users.list);

    app.route(root + 'users/:userId')
        //show
        .get(users.read)
        //update
        .put(users.update)
        .delete(users.delete);

    app.param('userId', users.userByID);

    app.route(root + 'fulluser')
        .get(users.userWithRequests);

    app.route(root + 'signup')
        .post(users.signup);

    app.route(root + 'signin')
        .post(passport.authenticate('local'), function (req,res){
            res.send(req.user);
        });



    app.get('/signout', users.signout);


    //Routes for facebook oauth
    app.get('/oauth/facebook', passport.authenticate('facebook', {
        failureRedirect: '/',
        scope: ['email']
    }));

    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/',
        successRedirect: '/main/'
    }));


    //Routes for token based facebook
    app.get('/auth/facebook/token',
      passport.authenticate('facebook-token'),
      function (req, res) {
        //res.sendStatus(req.user? 200 : 401);
        res.json(req.user);
      }
    );

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
