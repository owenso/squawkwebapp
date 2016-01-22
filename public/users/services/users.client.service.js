angular.module('users').factory('UserService', ['$http','$cookies','$location', '$rootScope', '$window', function($http,$cookies,$location,$rootScope, $window) {
    var userFac = {};

    userFac.newUser = {};
    userFac.getUserById = function(userID) {
        return $http.get('/api/v1/users/' + userID);
    };

    userFac.logOut = function() {
        $rootScope.token = undefined;
        $rootScope.authenticated = undefined;
        $cookies.remove('token');
        delete $rootScope.authenticated;
        $http
            .get('/signout')
            .success(function(data, status, headers, config) {
                console.log('this ran');
            });
    };

    userFac.logIn = function(userObject) {
        $http
            .post('/api/v1/signin', userObject)
            .success(function(data, status, headers, config) {
                    $rootScope.token = data.token;
                    $rootScope.authenticated = true;
                if(data.needLang === true){
                    $location.path('/signup2');
                } else {
                    $cookies.put('token', data.token, { path: '/main/' });
                    $window.location.href="/main/";
                }
            })
            .error(function(data, status, headers, config) {
                if(data == 'Unauthorized'){
                    $rootScope.message = 'Incorrect Username or Password.';
                }else{
                    $rootScope.message = data;
                }
            });
    };

    userFac.signUpOne = function(userData){
        $http
            .post('/api/v1/signup', userData)
            .success(function(data, status, headers, config) {
                $rootScope.token = data.token;
                $rootScope.authenticated = true;
                $location.path("/signup2");
            })
            .error(function(data, status, headers, config) {
                $rootScope.message = data;
            });
    };

    userFac.signUpTwo = function(nativeLanguages){
            $rootScope.selectedLanguage = nativeLanguages;
            $http
                .put('api/v1/currentuser', {'nativeLanguages':[nativeLanguages]})
                .success(function(data, status, headers, config){
                    $location.path('/signup3');
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                });
        };

    userFac.signUpThree = function(targetLanguages){
        $http
            .put('api/v1/currentuser', {'targetLanguages':[targetLanguages]})
            .success(function(data, status, headers, config){
                $cookies.put('token', data.token, { path: '/main/' });
                $window.location.href="/main/";
            })
            .error(function(data, status, headers, config) {
                console.log(data);
            });
    };
    return userFac;
}]);
