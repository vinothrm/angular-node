var request = require('request');
App.as.controller('MainController',['$scope','$cookieStore', function($scope,$cookieStore) {

    $scope.loggedIn = $cookieStore.get('loggedin');

    if ($scope.loggedIn == "true") {
        $scope.loggedOut = "";
    }
    else {
        $scope.loggedOut = "true";
        $cookieStore.put('loggedin',"false");
    }
    
    $scope.name = "123456";

    console.log('cookie login : ' + $cookieStore.get('loggedin'));

}]);
