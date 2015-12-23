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
        $cookies.remove("currentId");
        delete $rootScope.authenticated;
        $http
            .get('/signout')
            .success(function(data, status, headers, config) {
                console.log($cookies.getAll());
                $window.location.href="/";
            });
    };



    //recording

    mainFac.saveRecording = function (){

    };
    
    return mainFac;
}]);
