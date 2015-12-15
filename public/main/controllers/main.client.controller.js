angular.module('main').controller('MainController', ['$scope', 'MainService', '$location', '$rootScope', function($scope, MainService, $location, $rootScope) {
	  $rootScope.currentUrl = $location.path();
	  

}]);
