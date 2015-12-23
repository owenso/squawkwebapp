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
    mainFac.toWav = function(pcmBlob){
        // we create our wav file
        var buffer = new ArrayBuffer(44 + pcmBlob.length * 2);
        var view = new DataView(buffer);
         
        // RIFF chunk descriptor
        writeUTFBytes(view, 0, 'RIFF');
        view.setUint32(4, 44 + pcmBlob.length * 2, true);
        writeUTFBytes(view, 8, 'WAVE');
        // FMT sub-chunk
        writeUTFBytes(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        // stereo (2 channels)
        view.setUint16(22, 2, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 4, true);
        view.setUint16(32, 4, true);
        view.setUint16(34, 16, true);
        // data sub-chunk
        writeUTFBytes(view, 36, 'data');
        view.setUint32(40, pcmBlob.length * 2, true);
         
        // write the PCM samples
        var lng = pcmBlob.length;
        var index = 44;
        var volume = 1;
        for (var i = 0; i < lng; i++){
            view.setInt16(index, pcmBlob[i] * (0x7FFF * volume), true);
            index += 2;
        }
         
        // our final binary blob
        var blob = new Blob ( [ view ], { type : 'audio/wav' } );
    };


    mainFac.saveRecording = function (sourceBlob){
        var lib = new lamejs();
        var mp3Data = [];

        var mp3encoder = new lib.Mp3Encoder(1, 44100, 128); //mono 44.1khz encode to 128kbps
        var samples = sourceBlob; //one second of silence replace that with your own samples
        var mp3Tmp = mp3encoder.encodeBuffer(samples); //encode mp3

        //Push encode buffer to mp3Data variable
        mp3Data.push(mp3Tmp);
        // Get end part of mp3
        mp3Tmp = mp3encoder.flush();

        // Write last data to the output data, too
        // mp3Data contains now the complete mp3Data
        mp3Data.push(mp3Tmp);

        console.debug(mp3Data);
        var blob = new Blob(mp3Data, {type: 'audio/mp3'});
        console.log(blob);
        var blobURL = URL.createObjectURL(blob);
        console.log(blobURL);
    };
    
    return mainFac;
}]);
