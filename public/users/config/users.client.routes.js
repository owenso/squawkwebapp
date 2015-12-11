angular.module('users').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/profile', {
            templateUrl: 'users/views/users.client.userprofile.html',
            controller: 'ProfileController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);
