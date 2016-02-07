angular.module('main').controller('RequestsController', ['$scope', 'MainService', '$location', '$rootScope', '$cookies', 'socketio', function($scope, MainService, $location, $rootScope, $cookies, socketio) {

    $rootScope.currentUrl = $location.path();

    socketio.on('newRequest', function(msg){
      console.log(msg);
      $rootScope.requests.unshift(msg);
    });
    MainService.getAvaliableRequests();

    $scope.showNewRequest = function(type) {
        console.log('loading request modal');
        MainService.showModal(type);
    };

    $scope.viewBigger = function(url) {
        console.log('loading image modal');
        MainService.showImageModal(url);
    };

    $scope.goToRequest = function(id) {
        MainService.selectedRequest(id);
        //change inQueue to false
        //redirect to conversations page with id
    };

}]);
