angular.module('main').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: '/main/views/main.client.requests.html',
            controller: 'MainController'
        })

        .otherwise({
            redirectTo: '/'
        });
    }
]);
