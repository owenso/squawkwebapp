angular.module('main').factory('MainService', ['$http', '$cookies', '$location', '$rootScope', '$window', 'ModalService', function($http, $cookies, $location, $rootScope, $window, ModalService) {
    var mainFac = {};

    mainFac.newUser = {};

    // mainFac.getUserById = function(userID) {
    //     return $http.get('/api/users/' + userID);
    // };

    mainFac.getUser = function() {
        return $http.get('/api/fulluser');
    };

    mainFac.getLoggedUser = function() {
        var data = $window.userId;
        $cookies.put('currentId', data);
        $rootScope.authenticated = true;
    };

    mainFac.getAvaliableRequests = function() {
        $http
            .get('/api/avaliableRequests/')
            .success(function(data, status, headers) {
                $rootScope.requests = data;
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log(data);
            });
    };

    mainFac.getUsersRequests = function() {
        $http
            .get('/api/requests/')
            .success(function(data, status, headers) {
                $rootScope.requests = data;
                console.log(data);
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

    mainFac.showModal = function(type) {

        if (type == 'image') {
            ModalService.showModal({
                templateUrl: '/request_modal/views/requestmodal.client.image.html',
                controller: "RequestModalController"
            });
        } else if (type == 'voice') {
            ModalService.showModal({
                templateUrl: '/request_modal/views/requestmodal.client.voice.html',
                controller: "RequestModalController"
            });
        } else {
            ModalService.showModal({
                templateUrl: '/request_modal/views/requestmodal.client.text.html',
                controller: "RequestModalController"
            });
        }
    };

    mainFac.showImageModal = function(x) {
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
