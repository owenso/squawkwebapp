angular.module('users').controller('ProfileController', ['$scope', 'MainService','$rootScope', '$cookies', '$location', function($scope, MainService, $rootScope, $cookies, $location) {
		 $rootScope.currentUrl = $location.path();

    var getUserData = function() {
        MainService.getUserById($cookies.get('currentId'))
            .success(function(data) {
            	console.log(data);
                $scope.userData = data;
            });
    };
    getUserData();
}]);
