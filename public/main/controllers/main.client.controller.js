angular.module('main').controller('MainController', ['$scope', 'MainService', '$location', '$rootScope', '$sce', '$timeout', '$cookies', function($scope, MainService, $location, $rootScope, $sce, $timeout, $cookies) {
    $rootScope.currentUrl = $location.path();
    MainService.getLoggedUser();

    $scope.logOut = function() {
        MainService.logOut();
    };


    $scope.submitAudio = function(){
    	console.log('submitting audio');
    };

    $scope.submitImage = function(){
    	console.log('submitting image');
  	  var recObject = {
        author: $cookies.get('currentId'),
        filetype: 'image',
        //url: String, //////////remove and add later
        title: $scope.title,
        description:$scope.description,
      };
      console.log(recObject);
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
        var recObject = {
            author: $cookies.get('currentId'),
            filetype: 'audio',
            url: String, //////////remove and add later
            title: $scope.title,
            description:$scope.description,
            audioLength: String
        };
		MainService.saveRecording($scope.blob, recObject);
    };

    $scope.recording = false;
    setupRecording();

    function onMediaSuccess(stream) {
        $scope.mediaRecorder = new MediaStreamRecorder(stream);
        $scope.mediaRecorder.mimeType = 'audio/wav';
        $scope.mediaRecorder.audioChannels = 1;
        $scope.mediaRecorder.onstop = function() {
    			console.log('recording has been stopped.');
				};
        $scope.mediaRecorder.ondataavailable = function(blob) {
            var blobURL = URL.createObjectURL(blob);
            console.log('data available', blob);
            console.log(blobURL);
            $scope.audioRecording = $sce.trustAsResourceUrl(blobURL);
            $scope.recordingDone = true;
            $scope.blob = blob;
        };
    }

    function onMediaError(e) {
        console.error('Error:', e);
    }

}]);
