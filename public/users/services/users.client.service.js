angular.module('users').factory('UserService', ['$http','$cookies','$location', '$rootScope', function($http,$cookies,$location,$rootScope) {
    var userFac = {};

    userFac.newUser = {};
    userFac.getUserById = function(userID) {
        return $http.get('/api/users/' + userID);
    };

    userFac.logOut = function() {
        $http
            .get('/signout')
            .success(function(data, status, headers, config) {
                $cookies.remove('currentId');
                delete $rootScope.authenticated;
            });
        $location.path("/");
    };

    userFac.logIn = function(userObject) {
        $http
            .post('/api/signin', userObject)
            .success(function(data, status, headers, config) {
                $cookies.put('currentId',data._id);
                $location.path("/profile");
                $rootScope.authenticated = true;
            })
            .error(function(data, status, headers, config) {
                $cookies.remove('currentId');
                $scope.message = 'Error: Invalid user or password';
            });
    };

    userFac.signUpOne = function(userData){
        this.newUser = userData;
        $location.path('/signup2');
    };

    userFac.signUpTwo = function(knownLang){
        this.newUser.knownLang = knownLang;
        $location.path('/signup3');
    };

    userFac.signUpThree = function(learnLang){
        this.newUser.learnLang = learnLang;

        $http
            .post('/api/signup', this.newUser)
            .success(function(data, status, headers, config) {
                $cookies.put('currentId',data._id);
                $location.path("/");
                $rootScope.authenticated = true;
            })
            .error(function(data, status, headers, config) {
                console.log(data);
                console.log(status);
                $scope.message = 'Error: Invalid user or password';
            });
    };
    return userFac;
}]);
