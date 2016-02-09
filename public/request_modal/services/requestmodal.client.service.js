angular.module('requestModal').factory('RequestModalService', ['$http', '$cookies', '$location', '$rootScope', '$window', 'Upload', 'ModalService', '$timeout', function($http, $cookies, $location, $rootScope, $window, Upload, ModalService, $timeout) {
    var reqModalFac = {};

    reqModalFac.newUser = {};


    //recording
    reqModalFac.saveRecording = function(sourceBlob, formObject) {
        console.log('compressing recording');
        var reader = new FileReader();
        var _this = this;

        reader.onloadend = function(e) {
            var convBlob = new Int16Array(e.target.result);
            var lib = new lamejs();
            var mp3Data = [];
            var mp3encoder = new lib.Mp3Encoder(1, 44100, 128); //mono 44.1khz encode to 128kbps
            var samples = convBlob;
            var mp3Tmp = mp3encoder.encodeBuffer(samples); //encode mp3

            //Push encode buffer to mp3Data variable
            mp3Data.push(mp3Tmp);
            // Get end part of mp3
            mp3Tmp = mp3encoder.flush();

            // Write last data to the output data, too
            // mp3Data contains now the complete mp3Data
            mp3Data.push(mp3Tmp);

            var blob = new Blob(mp3Data, {
                type: 'audio/mp3'
            });
            var blobURL = URL.createObjectURL(blob);
            _this.uploadToS3(blob, formObject);
            _this.blob = blob;
            _this.blobURL = blobURL;
        };
        reader.readAsArrayBuffer(sourceBlob);
    };





    reqModalFac.uploadToS3 = function(uploaded, formObject, thumblink) {
        console.log('uploading...');
        var fileExt;
        if (uploaded.name) {
            fileExt = uploaded.name.split('.').pop();
        } else {
            fileExt = 'mp3';
        }
        var query = {
            filetype: fileExt,
            type: uploaded.type
        };
        var _this = this;
        console.log(formObject);
        $http
            .post('/signing', query)
            .success(function(result) {
                if (thumblink) {
                    //if thumbnail blob url is found, perform an xml request to get the file and upload it
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', thumblink, true);
                    xhr.responseType = 'blob';
                    xhr.onload = function(e) {
                        if (this.status == 200) {
                            var myBlob = this.response;
                            // myBlob is now the blob that the object URL pointed to.
                            var thumbResult = result;
                            thumbResult.fields.key = thumbResult.fields.key.substr(0, thumbResult.fields.key.lastIndexOf(".")) + "_th." + fileExt;
                            Upload.upload({
                                url: result.url,
                                transformRequest: function(data, headersGetter) {
                                    var headers = headersGetter();
                                    delete headers.Authorization;
                                    return data;
                                },
                                data: thumbResult.fields,
                                method: 'POST',
                                headers: {
                                    'Content-Type': result.fields['Content-Type']
                                },
                                file: myBlob
                            }).success(function(data, status, headers, config) {
                                console.log(data);
                                var parseResponse = data.match('<Location>(.*)</Location>');
                                var uploadedURL = parseResponse[1];

                                formObject.imageUrlTh = uploadedURL;

                            }).error(function(data) {
                                console.log(data);
                            });
                        }
                    };
                    xhr.send();

                }
                console.log(result);
                Upload.upload({
                    url: result.url, //s3Url
                    transformRequest: function(data, headersGetter) {
                        var headers = headersGetter();
                        delete headers.Authorization;
                        return data;
                    },
                    data: result.fields, //credentials
                    method: 'POST',
                    headers: {
                        'Content-Type': result.fields['Content-Type']
                    },
                    file: uploaded
                }).progress(function(evt) {
                    console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total));
                    $rootScope.progress = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    $rootScope.result = data;
                    var parseResponse = data.match('<Location>(.*)</Location>');
                    var uploadedURL = parseResponse[1];
                    $timeout($rootScope.close, 2000);

                    if (fileExt == 'mp3') {
                        formObject.audioUrl = uploadedURL;
                    } else {
                        formObject.imageUrl = uploadedURL;
                    }
                    _this.postNewRequest(formObject);
                }).error(function() {

                });
            })
            .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $rootScope.errorMsg = status + ': ' + data;
                console.log('ERROR:');
                console.log(headers);
                console.log(status);
                console.log(data);
            });

    };


    reqModalFac.postNewRequest = function(object) {
        $http
            .post('/api/v1/request', object)
            .success(function(data, status, headers, config) {
                console.log('new request');
            })
            .error(function(data, status, headers, config) {
                console.log('Error');
            });
    };

    reqModalFac.redirect = function(type) {
        if (type == "text") {
            $timeout($rootScope.close, 2000);
        } else {
            $rootScope.close();
            ModalService.showModal({
                templateUrl: '/request_modal/views/requestmodal.client.submitted.html',
                controller: "RequestModalController"
            });
        }

    };

    return reqModalFac;
}]);
