angular.module('main').controller('ProfileController', ['$scope', 'MainService','$rootScope', '$cookies', '$location', function($scope, MainService, $rootScope, $cookies, $location) {
    $rootScope.currentUrl = $location.path();

    var getUserData = function() {
        MainService.getUser()
            .success(function(data) {
                $scope.userData = data;

                //user's requests without responses
                $scope.pend = 0;
                
                //user's requests that have been responded to
                $scope.comp = 0;

                //requests user has responded to
                $scope.ans = 0;

                for (var i = 0; i < data.requests.length; i++) {
                	if (data.requests[i].inQueue === true){
                		$scope.pend += 1;
                	}
                	if (data.requests[i].inQueue === false){
                		$scope.comp += 1;
                	}
                }
                for (var j = 0; i<data.filledRequests.length; i++) {
                        $scope.ans += 1;
                }
            });
    };



    getUserData();
}]);
