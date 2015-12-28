angular.module('main').factory('MainService', ['$http', '$cookies', '$location', '$rootScope', '$window', 'ModalService', function($http, $cookies, $location, $rootScope, $window, ModalService) {
    var mainFac = {};

    mainFac.newUser = {};

    mainFac.getUserById = function(userID) {
        return $http.get('/api/users/' + userID);
    };

    mainFac.getLoggedUser = function() {
        var data  = $window.userId;
        $cookies.put('currentId', data);
        $rootScope.authenticated = true;
    };

    mainFac.getRequests = function () {
        $http
            .get('/api/showRequests/')
            .success(function(data, status, headers) {
                $rootScope.requests = data;
                console.log(data)
            })
            .error(function(data, status, headers, config) {
                console.log(data);
            });
    };

    mainFac.logOut = function() {
        $cookies.remove("currentId");
        delete $rootScope.authenticated;
        $http
            .get('/signout')
            .success(function(data, status, headers, config) {
                console.log($cookies.getAll());
                $window.location.href = "/";
            });
    };

    mainFac.showModal = function(){
        ModalService.showModal({
            templateUrl: '/request_modal/views/requestmodal.client.newrequestmodal.html',
            controller: "RequestModalController"
        });
    };

    mainFac.showImageModal = function(x){
        ModalService.showModal({
            templateUrl: '/main/views/main.client.imagemodal.html',
            controller: "ImageModalController",
            inputs: {
                url: x
            }

        });
    };

    return mainFac;
}]);
