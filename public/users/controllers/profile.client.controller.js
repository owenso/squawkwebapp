angular.module('users').controller('ProfileController', ['$scope', 'UserService','$rootScope', '$cookies', function($scope, UserService, $rootScope, $cookies) {

	console.log($cookies.getAll());
    var getUserData = function() {
        UserService.getUserById($cookies.get('currentId'))
            .success(function(data) {
                $scope.userData = data;
            });
    };
    getUserData();
}]);
