angular.module('main').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: '/main/views/main.client.requests.html'
        })
        .when('/profile', {
            templateUrl: '/main/views/users.client.userprofile.html',
            controller: 'ProfileController'
        })

        .when('/requests', {
            templateUrl: '/main/views/main.client.requests.html'
        })
        .when('/conversations', {
            templateUrl: '/main/views/main.client.conversations.html'
        })
        .when('/settings', {
            templateUrl: '/main/views/main.client.settings.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    }
]);
