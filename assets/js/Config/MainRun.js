module.exports = function(app,request){
    app.run(['$rootScope','$state','$cookieStore','$sessionStorage',function ($rootScope,$state,$cookieStore,$sessionStorage) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

            if(toState.data.requireLogin){

                request.get({url:APP_IS_LOGGED}, function (e, r, user) {
                    if(r.statusCode == 401){
                        return $state.go('login');
                    }
                    $rootScope.activeState = toState.name;
                    console.log(user);
                });

            }else{
                $rootScope.activeState = toState.name;
            }
        });

    }]);
};
