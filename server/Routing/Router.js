module.exports = function(app,rest,passport,auth){
    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    app.get('/isLogged', auth, function(req, res){
        res.send(req.user);
    });

    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.send(req.user);
    });

    app.post('/logout', function(req, res){
        req.logOut();
        res.sendStatus(200);
    });

};
