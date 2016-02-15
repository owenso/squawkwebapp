// Karma configuration
// Generated on Sun Feb 14 2016 19:49:39 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      "./public/lib/angular/angular.js",
      "./public/lib/angular-route/angular-route.js",
      "./public/lib/angular-cookies/angular-cookies.js",
      "./public/lib/angular-timer/dist/angular-timer.min.js",
      "./public/lib/angular-modal-service/dst/angular-modal-service.min.js",
      "./public/lib/ng-file-upload/ng-file-upload.min.js",
      "./public/lib/ng-file-upload/ng-file-upload-shim.min.js",
      "./public/lib/angular-svg-round-progressbar/build/roundProgress.min.js",
      "./public/lib/moment/min/moment.min.js",
      "./public/lib/moment/min/locales.min.js",
      "./public/lib/angular-moment/angular-moment.min.js",
      './public/main/*.js',
      './public/main/**/*.js',
      './public/users/*.js',
      './public/users/**/*.js',
      './public/request_modal/*.js',
      './public/request_modal/**/*.js',
      './public/application.js',
      './test/unit/*.test.js'
    ],

    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
