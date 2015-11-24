var mainApplicationModuleName = "squawker";

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'example']);

mainApplicationModule.config(['$locationProvider',
    function($locationProvider) {
      $locationProvider.hashPrefix('!');
    }
]);

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});
