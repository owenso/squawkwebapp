angular.module('main').controller('RequestsController', ['$scope', 'MainService', '$location', '$rootScope', '$cookies', function($scope, MainService, $location, $rootScope, $cookies) {
    
    $rootScope.currentUrl = $location.path();

    MainService.getRequests();

    $scope.showNewRequest = function(type) {
        console.log('loading request modal');
        MainService.showModal(type);
    };

    $scope.viewBigger = function(url) {
        console.log('loading image modal');
        MainService.showImageModal(url);
    };

}]);
