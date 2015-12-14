angular.module('main').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: '/main/views/main.client.requests.html',
            controller: 'MainController'
        })


        .when('/profile', {
            templateUrl: '/main/views/users.client.userprofile.html',
            controller: 'ProfileController'
        })

        .otherwise({
            redirectTo: '/'
        });
    }
]);
