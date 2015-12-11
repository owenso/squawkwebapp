var app = angular.module('squawker', ['ngRoute', 'ngCookies', 'users']);
app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
