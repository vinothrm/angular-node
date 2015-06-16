var angular = require('angular');
var angularuirouter = require('angular-ui-router');
var angularcookies = require('angular-cookies');
var ngstorage = require('ngstorage');
var request = require('request');
require('../../projectvar');

module.exports = App = function App() {
    console.log('Starting the app...');
    App.as = angular.module('angularnode', ['ngCookies','ui.router','smart-table','ngStorage']);
};

App.prototype.start = function(){
    console.log('the start function is running');
    require('./Config/MainConfig')(App.as,request);
    require('./Config/MainRun')(App.as,request);
};

var myApp = new App();
myApp.start();