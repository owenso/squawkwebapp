angular.module('users').controller('UserController', ['$scope', 'UserService', function($scope, UserService) {

    $scope.logIn = function() {
    	UserService.logIn($scope.user);
    };

    $scope.logOut = function() {
    	UserService.logOut();
    };

    $scope.signUpOne = function(){
        if($scope.signUp1.$valid){
    	   UserService.signUpOne($scope.newUser);
        }
        // else{
        //     $scope.message = "Please fix the errors and try again.";
        // }
    };

    $scope.signUpTwo = function(x){
    	UserService.signUpTwo(x);
    };

    $scope.signUpThree = function(y){
    	UserService.signUpThree(y);
    };
}]);
