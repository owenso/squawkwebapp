angular.module('users').controller('ProfileController', ['$scope', 'UserService','$rootScope', '$cookies', function($scope, UserService, $rootScope, $cookies) {

    var getUserData = function() {
        UserService.getUserById($cookies.get('currentId'))
            .success(function(data) {
            	console.log(data);
                $scope.userData = data;
            });
    };
    getUserData();
}]);
