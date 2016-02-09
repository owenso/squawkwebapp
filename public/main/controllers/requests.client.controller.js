angular.module('main').controller('RequestsController', ['$scope', 'MainService', '$location', '$rootScope', '$cookies', 'socketio', function($scope, MainService, $location, $rootScope, $cookies, socketio) {

    $rootScope.currentUrl = $location.path();

    MainService.getAvaliableRequests();
    
    socketio.on('newRequest', function(msg){
      for (var i = 0; i<MainService.nativeLanguages.length; i++){
        if (MainService.nativeLanguages[i] == msg.language){
            $rootScope.requests.unshift(msg);
        }
      }
    });

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
