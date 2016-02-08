angular.module('users').factory('UserService', ['$http','$cookies','$location', '$rootScope', '$window', function($http,$cookies,$location,$rootScope, $window) {
    var userFac = {};

    userFac.getUserById = function(userID) {
        return $http.get('/api/v1/users/' + userID);
    };

    userFac.logOut = function() {
        $cookies.remove('token');
        delete $rootScope.token;
        delete $rootScope.authenticated;
        $http
            .get('/signout')
            .success(function(data, status, headers, config) {
              $window.location.href="/";
            });
    };

    userFac.logIn = function(userObject) {
        var self = this;
        $http
            .post('/api/v1/signin', userObject)
            .success(function(data, status, headers, config) {
              $rootScope.authenticated = true;
                if(data.hasSelectedLanguages === false){
                    $rootScope.token = data.token;
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
      var self = this;
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
        if ($cookies.get('token')){
          $rootScope.authenticated = true;
          $rootScope.token = $cookies.get('token');
        }

        if ($rootScope.authenticated){
          $rootScope.selectedLanguage = nativeLanguages;
          $http
              .put('api/v1/currentuser', {'nativeLanguages':[nativeLanguages]})
              .success(function(data, status, headers, config){
                  $location.path('/signup3');
              })
              .error(function(data, status, headers, config) {
                  console.log(data);
              });
            } else {
                this.logOut();
            }

        };

    userFac.signUpThree = function(targetLanguages){
        $http
            .put('api/v1/currentuser', {'targetLanguages':[targetLanguages]})
            .success(function(data, status, headers, config){
                $cookies.remove('token', {path: '/'})
                $cookies.put('token', $rootScope.token, { path: '/main/' });
                $window.location.href="/main/";
            })
            .error(function(data, status, headers, config) {
                console.log(data);
            });
    };
    return userFac;
}]);
