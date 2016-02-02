angular.module('main').controller('ConversationsController', ['$scope', 'MainService', '$location', '$rootScope', '$http', function($scope, MainService, $location, $rootScope, $http) {

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


}]);
