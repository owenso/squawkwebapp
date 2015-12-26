angular.module('users').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider


        //http://code.ciphertrick.com/2014/12/14/check-condition-before-loading-route-in-angular-js/



        .when('/', {
            templateUrl: '/users/views/users.client.signin.html',
            controller: 'UserController'
        })

        .when('/signup', {
            templateUrl: '/users/views/users.client.signup.html',
            controller: 'UserController'
        })

        .when('/signup2', {
            templateUrl: '/users/views/users.client.signup2.html',
            controller: 'UserController'
        })

        .when('/signup3', {
            templateUrl: '/users/views/users.client.signup3.html',
            controller: 'UserController'
        })

        .otherwise({
            redirectTo: '/'
        });
    }
]);


