var app = angular.module('squawker', ['ngRoute','ngCookies','ngFileUpload','timer','users','main','requestModal','angularModalService', 'angular-svg-round-progress', 'angularMoment']);
// app.config(['$locationProvider',
//     function($locationProvider) {
//         $locationProvider.hashPrefix('!');
//     }]);

app.run(function(amMoment) {
    amMoment.changeLocale('en');
});

app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://s3.amazonaws.com/parakeet-uploads/**'
  ]);
});