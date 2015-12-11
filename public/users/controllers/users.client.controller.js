angular.module('users').controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
    $scope.logIn = function() {
    	UserService.logIn($scope.user);
    };

    $scope.logOut = function() {
    	UserService.logOut();
    };
}]);
