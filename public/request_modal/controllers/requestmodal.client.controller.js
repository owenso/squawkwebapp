angular.module('requestModal').controller('RequestModalController', ['$scope', 'ModalService','$rootScope', '$cookies', 'close', function($scope, ModalService, $rootScope, $cookies, close) {
      $scope.close = close;
}]);
