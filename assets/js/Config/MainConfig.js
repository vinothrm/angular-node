module.exports = function(app,request){
    app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {


        $urlRouterProvider.otherwise('/home');

        $stateProvider


            .state('template1', {
                url: '/template1',
                templateUrl: '/html/template1.html',
                data:{
                    requireLogin:true
                }
            })

            .state('login', {
                url: '/login',
                templateUrl: '/html/login.html',
                controller: 'LoginController',
                data:{
                    requireLogin:false
                }
            })

            .state('logout', {
                url: '/logout',
                templateUrl: '/html/home.html',
                controller: 'LogoutController',
                data:{
                    requireLogin:false
                }
            })

            .state('table', {
                url: '/table',
                templateUrl: '/html/table.html',
                controller: 'TableController',
                data:{
                    requireLogin:false
                }
            })

            .state('about', {
                url: '/about',
                data:{
                    requireLogin:false
                },
                views: {
                    '': {templateUrl: '/html/partial-about.html'},
                    'columnOne@about': { template: 'Look I am a column!' },
                    'columnTwo@about': {
                        templateUrl: '/html/mainC.html',
                        controller: 'MainController'
                    }
                }
            })


            .state('home', {
                url: '/home',
                templateUrl: '/html/home.html',
                data:{
                    requireLogin:false
                }
            });

    }]);

    require('../Controller/MainController')(app,request);
    require('../Controller/LoginController')(app,request);
    require('../Controller/TableController')(app,request);
    require('../Controller/LogoutController')(app,request);
};
