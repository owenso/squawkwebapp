var app = angular.module('squawker', ['ngRoute', 'ngCookies', 'ngFileUpload', 'timer', 'users', 'main', 'requestModal', 'angularModalService', 'angular-svg-round-progress', 'angularMoment']);
// app.config(['$locationProvider',
//     function($locationProvider) {
//         $locationProvider.hashPrefix('!');
//     }]);

app.run(function(amMoment) {
    amMoment.changeLocale('en');
});

app.factory('httpRequestInterceptor', ['$rootScope', function($rootScope) {
    return {
        request: function(config) {
            if ($rootScope.authenticated && ((config.url === 'https://s3.amazonaws.com/parakeet-uploads') === false)) {
                config.headers.authorization = $rootScope.token;
            }
            return config;
        }
    };
}]);

app.config(function($sceDelegateProvider, $httpProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://s3.amazonaws.com/parakeet-uploads/**'
    ]);
      $httpProvider.interceptors.push('httpRequestInterceptor');

});
