var request = require('request');
App.as.controller('LoginController',['$rootScope','$scope','$cookieStore','$q','$state','$sessionStorage', function($rootScope,$scope,$cookieStore,$q,$state,$sessionStorage) {

    $rootScope.loggedUser = $sessionStorage.loggedUser || undefined;

    $rootScope.activeheader = 'active';

    $scope.loggedIn = $cookieStore.get('loggedin');

    if ($scope.loggedIn == "true") {
        $scope.loggedOut = "";
    }
    else {
        $scope.loggedOut = "true";
        $cookieStore.put('loggedin',"false");
    }

    $scope.user = {
        userName:'A',
        passWord:'B',
        error:'f'
    };

    $scope.errorObj = '';

    asyncPOST = function(data){

        var deferred = $q.defer();

        deferred.notify('About to authenticate ' + data.userName + '.');

        request.post(
            {
                url: APP_LOGIN_URL,
                form: {
                    userName: data.userName,
                    passWord: data.passWord,
                    proxy:'Portal'
                }
            },function(err,httpResponse,body){
                console.log(body);
                responseBody = JSON.parse(body);
                if(responseBody.result == 'SUCCESS') {
                    $cookieStore.put('loggedin', "true");
                    deferred.resolve('authenticate success' + data.userName + '.');
                }else{
                    $cookieStore.put('loggedin', "false");
                    deferred.reject('authenticate failure ' + responseBody.result + '.');
                }
            }
        );

        return deferred.promise;
    };

    $scope.loginUser = function(user){
        var promise = asyncPOST(user);
        promise.then(function(greeting) {
            /*resolve*/
            console.log(greeting);
            $scope.errorObj = greeting;
            $sessionStorage.loggedUser = user.userName;
            $state.go('home');
        }, function(reason) {
            /*reject*/
            console.log(reason);
            $scope.errorObj = reason;
        }, function(update) {
            /*notify*/
            console.log(update);
            $scope.errorObj = update;
        });
    };

    console.log('cookie login : ' + $cookieStore.get('loggedin'));

}]);
