angular.module('users').controller('ProfileController', ['$scope', 'MainService','$rootScope', '$cookies', function($scope, MainService, $rootScope, $cookies) {

    var getUserData = function() {
        MainService.getUserById($cookies.get('currentId'))
            .success(function(data) {
            	console.log(data);
                $scope.userData = data;
            });
    };
    getUserData();
}]);
