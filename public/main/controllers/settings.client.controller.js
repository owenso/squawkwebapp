angular.module('main').controller('SettingsController', ['$scope', 'MainService', '$location', '$rootScope', '$cookies', function($scope, MainService, $location, $rootScope, $cookies) {
    $rootScope.currentUrl = $location.path();

}]);
