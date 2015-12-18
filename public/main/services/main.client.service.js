angular.module('main').factory('MainService', ['$http','$cookies','$location', '$rootScope', '$window', function($http,$cookies,$location,$rootScope,$window) {
    var mainFac = {};

    mainFac.newUser = {};

    mainFac.getUserById = function(userID) {
        return $http.get('/api/users/' + userID);
    };

    mainFac.getLoggedUser = function(){
        $http
            .get('../api/currentUserId')
            .success(function(data, status, headers, config){
                $cookies.put('currentId',data);
                $rootScope.authenticated = true;
              });
    };

    mainFac.logOut = function() {
        $http
            .get('/signout')
            .success(function(data, status, headers, config) {
                console.log($cookies.getAll());
                $cookies.remove("currentId");
                delete $rootScope.authenticated;
                $window.location.href="/";
            });
    };
    return mainFac;
}]);
