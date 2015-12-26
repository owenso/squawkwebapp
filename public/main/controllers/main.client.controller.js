angular.module('main').controller('MainController', ['$scope', 'MainService', '$location', '$rootScope', '$cookies', function($scope, MainService, $location, $rootScope, $cookies) {
    
    $rootScope.currentUrl = $location.path();
    
    MainService.getLoggedUser();

    $scope.logOut = function() {
        MainService.logOut();
    };


    $scope.showNewRequest = function() {
        MainService.showModal();
    };

}]);
