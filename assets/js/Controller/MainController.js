module.exports = function(app,request){
    app.controller('MainController',['$scope','$cookieStore', function($scope,$cookieStore) {
        $scope.loggedIn = $cookieStore.get('loggedin');
        $scope.name = "123456";
        console.log('cookie login : ' + $cookieStore.get('loggedin'));
    }]);
};

