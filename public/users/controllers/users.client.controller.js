angular.module('users').controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
    $scope.logIn = function() {
    	UserService.logIn($scope.user);
    };

    $scope.logOut = function() {
    	UserService.logOut();
    };

    // $scope.getUserData =function(){
    // 	UserService.getUserById($rootScope.currentId)
    // 		.success(function(data){
    // 			$scope.userData = data;
    // 			console.log(data);
    // 		});
    // };
}]);
