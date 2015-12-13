var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
    app.route('/api/users')
        //create
        .post(users.create)
        //index
        .get(users.list);

    app.route('/api/users/:userId')
        //show
        .get(users.read)
        //update
        .put(users.update)
        .delete(users.delete);

    app.param('userId', users.userByID);

    app.route('/api/checkunique/')
        .post(users.uniqueCheck);

    app.route('/api/signup')
        //disabled: angular will handle signup rendering
        //.get(users.renderSignup)
        .post(users.signup);

    app.route('/api/signin')
        //disabled: angular will handle signin rendering
        //.get(users.renderSignin)
        .post(passport.authenticate('local', {
            //successRedirect: '/',
            //failureRedirect: '/signin',
            failureFlash: true
        }), function (req,res){
            res.send(req.user);
        });

    //disabled, both can use above signup route
    // app.route('/mobileSignup')
    //     .post(users.mobileSignup);
    

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

    // app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
    //     failureRedirect: '/signin',
    //     successRedirect: '/'
    // }));

    app.get('/oauth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/' }),
        function(req, res) 
        {
            console.log('we b logged in!');
            console.log(req.user._id);
            res.cookie('authenticated', 'true',{ maxAge: 60 * 1000 });
            res.cookie('userid', req.user._id,{ maxAge: 60 * 1000 });
            console.log(res.cookie);
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
