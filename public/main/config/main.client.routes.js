angular.module('main').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when('/', {
            redirectTo: '/requests'
        })
        .when('/profile', {
            templateUrl: '/main/views/users.client.userprofile.html',
            controller: 'ProfileController'
        })

        .when('/requests', {
            templateUrl: '/main/views/main.client.requests.html',
            controller: 'RequestsController'
        })
        .when('/conversations', {
            templateUrl: '/main/views/main.client.conversations.html',
            controller: 'ConversationsController'
        })
        .when('/settings', {
            templateUrl: '/main/views/main.client.settings.html',
            controller: 'SettingsController'
        })
        .otherwise({
            redirectTo: '/'
        });
    }
]);
