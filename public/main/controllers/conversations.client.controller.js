angular.module('main').controller('ConversationsController', ['$scope', 'MainService', '$location', '$rootScope', '$cookies', function($scope, MainService, $location, $rootScope, $cookies) {
    $rootScope.currentUrl = $location.path();
    console.log($rootScope.viewRequestId);
}]);
