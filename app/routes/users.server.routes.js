var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
    app.route('/api/v1/users')
        //create
        // .post(users.create)
        //index
        .get(users.list);

    app.route('/api/v1/users/:userId')
        //show
        .get(users.read)
        //update
        .put(users.update)
        .delete(users.delete);

    app.param('userId', users.userByID);

    app.route('/api/v1/fulluser')
        .get(users.userWithRequests);

    app.route('/api/v1/signup')
        .post(users.signup);

    app.route('/api/v1/signin')
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
