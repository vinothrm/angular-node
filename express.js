var express = require('express');
var bodyParser = require('body-parser');
require('./projectvar');

var serverPort = APP_PORT;

module.exports = Server = function Server() {
    console.log('Instantiating the server...');
    Server.expressApp = express();
    Server.expressApp.use(bodyParser.json()); // support json encoded bodies
    Server.expressApp.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    Server.expressApp.use(express.static('app'));
    Server.expressApp.use('/assets',express.static('assets'));
    Server.expressApp.use('/html',express.static('html'));
    Server.expressApp.use('/app',express.static('app'));
};

Server.prototype.start = function(){

    console.log('Starting the server');

    require('./server/Routing/Router');

    Server.App = Server.expressApp.listen(serverPort, function () {
        var host = Server.App.address().address;
        var port = Server.App.address().port;
        console.log('Example app listening at http://%s:%s', host, port);
    });
};

var appServer = new Server();
appServer.start();