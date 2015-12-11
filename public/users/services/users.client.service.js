angular.module('users').factory('UserService', ['$http','$rootScope','$location', function($http,$rootScope,$location) {
    var userFac = {};

    userFac.getUserById = function(userID) {
        return $http.get('/api/users/' + userID);
    };

    userFac.logOut = function() {
        $http
            .get('/signout')
            .success(function(data, status, headers, config) {
                delete $rootScope.currentId;
            });
        $location.path("/");
    };

    userFac.logIn = function(userObject) {
        $http
            .post('/signin', userObject)
            .success(function(data, status, headers, config) {
                $rootScope.currentId = data._id;
                $location.path("/profile");
            })
            .error(function(data, status, headers, config) {
                delete $rootScope.currentId;
                $scope.message = 'Error: Invalid user or password';


            });
    };
    return userFac;
}]);
