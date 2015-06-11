App.as.run(['$rootScope','$state','$cookieStore','$sessionStorage',function ($rootScope,$state,$cookieStore,$sessionStorage) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        $rootScope.loggedUser = $sessionStorage.loggedUser || undefined;

        var requireLogin = toState.data.requireLogin;
        console.log("logged in user : " + JSON.stringify($rootScope.loggedUser));
        if (requireLogin && $rootScope.loggedUser === undefined) {
            event.preventDefault();
            console.log("require Login");
            return $state.go('login');
        }else{
            $rootScope.activeState = toState.name;
            console.log("login not required");
        }
    });

}]);