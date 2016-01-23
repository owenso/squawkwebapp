angular.module('main').factory('MainService', ['$http', '$cookies', '$location', '$rootScope', '$window', 'ModalService', function($http, $cookies, $location, $rootScope, $window, ModalService) {
    var mainFac = {};

    mainFac.newUser = {};


    mainFac.getUser = function() {
        return $http.get('/api/v1/currentuser');
    };

    mainFac.selectedRequest = function(id) {
        $location.path('conversations');
        $rootScope.viewRequestId = id;
    };
    mainFac.showRequest = function() {
        console.log($rootScope.viewRequestId);
        $http
            .get('/api/v1/request/' + $rootScope.viewRequestId)
            .success(function(data, status, headers) {
                delete $rootScope.viewRequestId;
                console.log(data);
                return data;
            });
    };
    mainFac.authCheck = function(){
     if (($cookies.get('token'))===undefined){
            this.logOut();
        } else {
            $rootScope.authenticated = true;
            $rootScope.token = $cookies.get('token');
        }
    };
    mainFac.getAvaliableRequests = function() {
        if (($cookies.get('token'))===undefined){
            this.logOut();
        } else {
            $rootScope.authenticated = true;
            $rootScope.token = $cookies.get('token');
        $http
            .get('/api/v1/availableRequests/')
            .success(function(data, status, headers) {
                $rootScope.requests = data;
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log(data);
            });
        }
    };

    mainFac.getUsersRequests = function() {
        $http
            .get('/api/v1/request/')
            .success(function(data, status, headers) {
                $rootScope.requests = data;
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log(data);
            });
    };

    mainFac.logOut = function() {
        $cookies.remove('token');
        delete $rootScope.token;
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
