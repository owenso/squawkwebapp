var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
    app.route('/api/users')
        //create
        // .post(users.create)
        //index
        .get(users.list);

    app.route('/api/users/:userId')
        //show
        .get(users.read)
        //update
        .put(users.update)
        .delete(users.delete);

    app.param('userId', users.userByID);

    app.route('/api/currentUserId')
        .get(users.getCurrentId);

    app.route('/api/signup')
        .post(users.signup);

    app.route('/api/signin')
        .post(passport.authenticate('local'), function (req,res){
            res.send(req.user);
        });


    //disabled, both can use above signup route
    // app.route('/mobileSignup')
    //     .post(users.mobileSignup);
    


    //Returns user object if user is sucessfully authenticated, "unauthorized" if user is not
    //Disabled, can just use regular sign in route

    // app.route('/mobileSignin')
    //     .post(passport.authenticate('local'), function (req, res){
    //         res.send(req.user);
    //     });

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
