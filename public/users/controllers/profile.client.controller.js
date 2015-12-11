angular.module('users').controller('ProfileController', ['$scope', 'UserService','$rootScope', '$cookies', function($scope, UserService, $rootScope, $cookies) {
    var getUserData = function() {
        console.log($cookies.getAll());
        UserService.getUserById($rootScope.currentId)
            .success(function(data) {
                $scope.userData = data;
            });
    };
    getUserData();
}]);
