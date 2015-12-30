angular.module('main').controller('ProfileController', ['$scope', 'MainService','$rootScope', '$cookies', '$location', function($scope, MainService, $rootScope, $cookies, $location) {
    $rootScope.currentUrl = $location.path();

    var getUserData = function() {
        MainService.getUser()
            .success(function(data) {
                $scope.userData = data;
            });
    };



    getUserData();
}]);
