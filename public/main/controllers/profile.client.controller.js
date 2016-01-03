angular.module('main').controller('ProfileController', ['$scope', 'MainService','$rootScope', '$cookies', '$location', function($scope, MainService, $rootScope, $cookies, $location) {
    $rootScope.currentUrl = $location.path();

    var getUserData = function() {
        MainService.getUser()
            .success(function(data) {
                $scope.userData = data;
                $scope.pend = 0;
                $scope.ans = 0;
                $scope.comp = 0;

                for (var i = 0; i < data.createdRequestIds.length; i++) {
                	if (data.createdRequestIds[i].pending === true){
                		$scope.pend += 1;
                	}
                	if (data.createdRequestIds[i].completed === true){
                		$scope.comp += 1;
                	}
                	if (data.createdRequestIds[i].responseMessageIds>0){
                		$scope.ans += 1;
                	}
                }
            });
    };



    getUserData();
}]);
