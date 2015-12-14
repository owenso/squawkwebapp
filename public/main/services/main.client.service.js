angular.module('main').factory('MainService', ['$http','$cookies','$location', '$rootScope', function($http,$cookies,$location,$rootScope) {
    var mainFac = {};

    mainFac.newUser = {};
    mainFac.getUserById = function(userID) {
        return $http.get('/api/users/' + userID);
    };

    return mainFac;
}]);
