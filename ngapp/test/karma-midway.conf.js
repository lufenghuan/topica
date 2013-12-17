var sharedConfig = require('./karma-shared.conf');

module.exports = function(config) {
  var conf = sharedConfig();

  conf.files = conf.files.concat([
    //3rd party
    'node_modules/ng-midway-tester/src/ngMidwayTester.js',

    //mocha stuff
    'test/mocha.conf.js',

    //test files
    'test/midway/*.js',
  ]);

  config.set(conf);
};
