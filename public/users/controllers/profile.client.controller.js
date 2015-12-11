angular.module('users').controller('ProfileController', ['$scope', 'UserService','$rootScope', function($scope, UserService, $rootScope) {
    var getUserData = function() {
        console.log('profile controller function running');
        UserService.getUserById($rootScope.currentId)
            .success(function(data) {
                $scope.userData = data;
                console.log(data);
            });
    };
    getUserData();
}]);
