angular.module('main').controller('ProfileController', ['$scope', 'MainService','$rootScope', '$cookies', '$location', function($scope, MainService, $rootScope, $cookies, $location) {
		 $rootScope.currentUrl = $location.path();

    var getUserData = function() {
        MainService.getUserById($cookies.get('currentId'))
            .success(function(data) {
                if (data.fullName === "undefined undefined"){
                    data.fullName = null;
                }
                $scope.userData = data;
            });
    };

    $scope.logOut = function() {
    	MainService.logOut();
    };

    getUserData();
}]);
