module.exports = function(app,request){
    app.run(['$rootScope','$state','$cookieStore','$sessionStorage','$q',function ($rootScope,$state,$cookieStore,$sessionStorage,$q) {

        var checkLoggedin = function($q){
            var deferred = $q.defer();
            request.get(
                {
                    url:APP_IS_LOGGED
                }, function (e, r, user) {
                        if(r.statusCode == 401){
                            deferred.reject("Not Authorized!!");
                        }
                        deferred.resolve(user);
            });
            return deferred.promise;
        };

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            $rootScope.loggedUser = $sessionStorage.loggedUser || undefined;
            if(toState.data.requireLogin){
                var promise = checkLoggedin($q);
                promise.then(function(user) {
                    /*resolve*/
                    console.log(user);
                    $rootScope.activeState = toState.name;
                }, function(reason) {
                    /*reject*/
                    console.log(reason);
                    $state.go('login');
                }, function(update) {
                    /*notify*/
                    console.log(update);
                });
            }else{
                $rootScope.activeState = toState.name;
            }
        });

    }]);
};
