angular.module('main').controller('ImageModalController', ['$scope', 'MainService', '$location', '$rootScope', '$cookies', 'close', 'url', function($scope, MainService, $location, $rootScope, $cookies, close, url) {
        console.log('modl running');
        $scope.close = close;
        $scope.url = url;


}]);
