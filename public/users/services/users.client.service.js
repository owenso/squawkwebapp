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
        // $http
        //     .post('/api/checkunique', {'username':userData.username, 'email':userData.email})
        //     .success(function(data, status, headers, config){
        //         if (data === false) {
        //             this.newUser = userData;
        //             $location.path('/signup2');
        //         }
        //         else{
        //             $rootScope.message = data;
        //         }
        //     });
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
                $rootScope.message = data;
            });
    };
    return userFac;
}]);
