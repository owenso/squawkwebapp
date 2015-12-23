angular.module('main').controller('MainController', ['$scope', 'MainService', '$location', '$rootScope', '$sce', '$timeout', function($scope, MainService, $location, $rootScope, $sce, $timeout) {
    $rootScope.currentUrl = $location.path();
    MainService.getLoggedUser();

    $scope.logOut = function() {
        MainService.logOut();
    };

    ///recording

    var setupRecording = function() {
        var mediaConstraints = {
            audio: true
        };
        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
    };

    $scope.startRecording = function() {
        $scope.recording = true;
        $scope.recordingDone = false;
        $scope.mediaRecorder.start(1000 * 60);

        $timeout($scope.stopRecording, 1000 * 60);
    };

    $scope.stopRecording = function() {
        $scope.mediaRecorder.stop();
        $scope.recording = false;
    };

    $scope.saveRecording = function () {
      VoicememoResource.addMemo($scope.memoTitle, $scope.audioRecording).then(function () {
        console.log('save completed', arguments);
      });
    };

    $scope.recording = false;
    setupRecording();

    function onMediaSuccess(stream) {
        $scope.mediaRecorder = new MediaStreamRecorder(stream);
        $scope.mediaRecorder.mimeType = 'audio/ogg';
        $scope.mediaRecorder.audioChannels = 1;
        $scope.mediaRecorder.ondataavailable = function(blob) {
            var blobURL = URL.createObjectURL(blob);
            console.log('data available', blob);
            console.log(blobURL);
            $scope.audioRecording = $sce.trustAsResourceUrl(blobURL);
            $scope.recordingDone = true;
        };
    }

    function onMediaError(e) {
        console.error('Error:', e);
    }

}]);
