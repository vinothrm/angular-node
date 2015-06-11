var angular = require('angular');
var angularuirouter = require('angular-ui-router');
var angularcookies = require('angular-cookies');
var $ = require('jquery');
angular.$ = $;
var ngstorage = require('ngstorage');
var underscore = require('underscore');
var uuid = require('node-uuid');
require('../../projectvar');

module.exports = App = function App() {
    console.log('Starting the app...');
    App.as = angular.module('angularnode', ['ngCookies','ui.router','smart-table','ngStorage']);
};

App.prototype.start = function(){
    console.log('the start function is running');
    require('./Config/MainConfig');
    require('./Config/MainRun');
    /*require('./Controller/MainController');*/
};

var myApp = new App();
myApp.start();