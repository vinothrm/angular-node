module.exports = function(app,request){
    app.controller('LogoutController',['$rootScope','$scope','$cookieStore','$q','$state','$sessionStorage', function($rootScope,$scope,$cookieStore,$q,$state,$sessionStorage) {
        request.post({
            url: APP_LOGOUT_URL
        });
        $rootScope.loggedUser = undefined;
        $sessionStorage.loggedUser = undefined;
        $state.go('home');
        console.log('logged out !! ');
    }]);
};


