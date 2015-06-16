module.exports = function(app,request){
    app.controller('LoginController',['$rootScope','$scope','$cookieStore','$q','$state','$sessionStorage', function($rootScope,$scope,$cookieStore,$q,$state,$sessionStorage) {

        $rootScope.loggedUser = $sessionStorage.loggedUser || undefined;

        $rootScope.activeheader = 'active';

        $scope.user = {
            userName:'',
            passWord:'',
            error:''
        };

        $scope.errorObj = '';

        asyncPOST = function(data){

            var deferred = $q.defer();

            deferred.notify('About to authenticate ' + data.userName + '.');

            request.post(
                {
                    url: APP_LOGIN_URL,
                    form: {
                        username: data.userName,
                        password: data.passWord,
                        proxy:'Portal'
                    }
                },function(err,httpResponse,body){
                    if(httpResponse.statusCode == 200){
                        deferred.resolve('authenticate success.');
                    }else{
                        deferred.reject('authenticate failure.');
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
};


