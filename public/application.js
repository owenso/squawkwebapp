var app = angular.module('squawker', ['ngRoute', 'users']);
app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
