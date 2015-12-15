angular.module('users').factory('UserService', ['$http','$cookies','$location', '$rootScope', '$window', function($http,$cookies,$location,$rootScope, $window) {
    var userFac = {};

    userFac.newUser = {};
    userFac.getUserById = function(userID) {
        return $http.get('/api/users/' + userID);
    };

    userFac.logOut = function() {
        $http
            .get('/signout')
            .success(function(data, status, headers, config) {
                console.log($cookies.getAll());
                $cookies.remove("currentId");
                delete $rootScope.authenticated;
                $window.location.href="/";
            });
    };

    userFac.logIn = function(userObject) {
        $http
            .post('/api/signin', userObject)
            .success(function(data, status, headers, config) {
                $cookies.put('currentId',data._id);
                $rootScope.authenticated = true;
                if(data.knownLang === undefined || data.learnLang === undefined){
                    $location.path('/signup2');
                } else {
                    $window.location.href="/main/";
                }
            })
            .error(function(data, status, headers, config) {
                $cookies.remove('currentId');
                $rootScope.message = data;
            });
    };

    userFac.signUpOne = function(userData){
        $http
            .post('/api/signup', userData)
            .success(function(data, status, headers, config) {
                $cookies.put('currentId',data._id);
                $location.path("/signup2");
                $rootScope.authenticated = true;
            })
            .error(function(data, status, headers, config) {
                $cookies.remove('currentId');
                $rootScope.message = data;
            });
    };

    userFac.signUpTwo = function(knownLang){
        $http
            .get('api/currentUserId')
            .success(function(data, status, headers, config){
                $cookies.put('currentId',data);
                $rootScope.authenticated = true;

            $http
                .put('api/users/' + $cookies.get('currentId'), {'knownLang':knownLang})
                .success(function(data, status, headers, config){
                    $location.path('/signup3');
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
            });
        };

    userFac.signUpThree = function(learnLang){
        $http
            .put('api/users/' + $cookies.get('currentId'), {'learnLang':learnLang})
            .success(function(data, status, headers, config){
                console.log(data);
                $window.location.href="/main/";
            })
            .error(function(data, status, headers, config) {
                console.log(data);
            });
    };
    return userFac;
}]);
