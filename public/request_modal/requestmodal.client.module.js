navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
console.log(navigator.getUserMedia);
console.log(navigator.mozGetUserMedia);
angular.module('requestModal', []);