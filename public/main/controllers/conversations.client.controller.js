angular.module('main').controller('ConversationsController', ['$scope', 'MainService', '$location', '$rootScope', '$http', 'socketio', function($scope, MainService, $location, $rootScope, $http, socketio) {

$rootScope.currentUrl = $location.path();

if ($rootScope.viewRequestId) {
    $http
        .get('/api/v1/request/' + $rootScope.viewRequestId)
        .success(function(data, status, headers) {
            delete $rootScope.viewRequestId;
            console.log(data);
            $scope.request = data;
        });
}


// socketio.on('newRequest', function(msg){
//   for (var i = 0; i<MainService.nativeLanguages.length; i++){
//     if (MainService.nativeLanguages[i] == msg.language){
//         $rootScope.requests.unshift(msg);
//     }
//   }
// });


  socketio.on('connection', function(){
    console.log('connected');
  });

  socketio.on('disconnect', function(){
    console.log('disconnected');
  });
}]);
