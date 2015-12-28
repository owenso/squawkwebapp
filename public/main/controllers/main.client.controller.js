angular.module('main').controller('MainController', ['$scope', 'MainService', '$location', '$rootScope', '$cookies', function($scope, MainService, $location, $rootScope, $cookies) {
    
    $rootScope.currentUrl = $location.path();
    console.log('running');
    MainService.getLoggedUser();
    MainService.getRequests();

    $scope.logOut = function() {
        MainService.logOut();
    };


    $scope.showNewRequest = function() {
        console.log('loading request modal');
        MainService.showModal();
    };

    $scope.viewBigger = function(url) {
        console.log('loading image modal');
        MainService.showImageModal(url);
    };

}]);
