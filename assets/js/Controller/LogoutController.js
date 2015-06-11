var request = require('request');
App.as.controller('LogoutController',['$rootScope','$scope','$cookieStore','$q','$state','$sessionStorage', function($rootScope,$scope,$cookieStore,$q,$state,$sessionStorage) {

    $sessionStorage.$reset();
    $state.go('home');
    console.log('logged out !! ');

}]);
