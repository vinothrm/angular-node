var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override')
require('./projectvar');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var rest = require('restler');


//==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
    function(username, password, done) {
        rest.post(SER_LOGIN, {
            data: { userName: username,passWord: password ,proxy: 'Portal' },
            headers : {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).on('complete', function(data, response) {
            console.log(data.result);
            if(data.result == 'SUCCESS'){
                done(null, username);
            }
            else{
                return done(null, false, { message: 'invalid username/passport' });
            }
        });
    }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
    if (!req.isAuthenticated())
        res.sendStatus(401);
    else
        next();
};
//==================================================================

var serverPort = APP_PORT;

module.exports = Server = function Server() {
    console.log('Instantiating the server...');
    Server.expressApp = express();
    Server.expressApp.use(bodyParser.json()); // support json encoded bodies
    Server.expressApp.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    Server.expressApp.use(cookieParser());
    Server.expressApp.use(methodOverride());
    Server.expressApp.use(expressSession({
        secret: 'securedsession',
        resave: true,
        saveUninitialized: true,
        cookie:{
            maxAge : 3600000
        }
    }));
    Server.expressApp.use(passport.initialize());
    Server.expressApp.use(passport.session());
    Server.expressApp.use(express.static('app'));
    Server.expressApp.use('/assets',express.static('assets'));
    Server.expressApp.use('/html',express.static('html'));
    Server.expressApp.use('/app',express.static('app'));
};

Server.prototype.start = function(){

    console.log('Starting the server');

    require('./server/Routing/Router')(Server.expressApp,rest,passport,auth);

    Server.App = Server.expressApp.listen(serverPort, function () {
        var host = Server.App.address().address;
        var port = Server.App.address().port;
        console.log('Example app listening at http://%s:%s', host, port);
    });
};

var appServer = new Server();
appServer.start();
