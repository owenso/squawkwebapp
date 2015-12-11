var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function(app) {
    app.route('/api/users')
        .post(users.create)
        .get(users.list);

    app.route('/api/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);

    app.param('userId', users.userByID);

        
    app.route('/signup')
        //disabled: angular will handle signup rendering
        //.get(users.renderSignup)
        .post(users.signup);

    app.route('/signin')
        //disabled: angular will handle signin rendering
        //.get(users.renderSignin)
        .post(passport.authenticate('local', {
            //successRedirect: '/',
            //failureRedirect: '/signin',
            failureFlash: true
        }), function (req,res){
            res.send(req.user);
        });

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

    // app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
    //     failureRedirect: '/signin',
    //     successRedirect: '/'
    // }, function(err,user){
    //     //res.JSON(req.user);
    //     console.log(err);
    //     console.log(user);
    // }));


    app.get('/oauth/facebook/callback', function(req, res, next) {
 passport.authenticate('facebook', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json(user);
    });
  })(req, res, next);
});

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
