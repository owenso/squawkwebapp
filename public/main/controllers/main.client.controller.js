angular.module('main').controller('MainController', ['$scope', 'MainService', '$location', '$rootScope', '$cookies', function($scope, MainService, $location, $rootScope, $cookies) {
    
    $rootScope.currentUrl = $location.path();
    console.log('running');
    MainService.getLoggedUser();
    MainService.getRequests();

    $scope.logOut = function() {
        MainService.logOut();
    };

}]);
