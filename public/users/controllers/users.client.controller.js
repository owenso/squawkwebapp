angular.module('users').controller('UserController', ['$scope', 'UserService', function($scope, UserService) {

    $scope.logIn = function() {
    	UserService.logIn($scope.user);
    };

    $scope.logOut = function() {
    	UserService.logOut();
    };

    $scope.signUpOne = function(){
    	UserService.signUpOne($scope.newUser);
    };

    $scope.signUpTwo = function(x){
    	UserService.signUpTwo(x);
    };

    $scope.signUpThree = function(y){
    	UserService.signUpThree(y);
    };
}]);
