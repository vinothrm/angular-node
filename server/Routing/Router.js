var rest = require('restler');

Server.expressApp.get('/', function (req, res) {
    res.send('Hello World!');
});

Server.expressApp.post('/login', function (req, res) {
    console.log(req.body.userName);
    rest.post(SER_LOGIN, {
        data: { userName: req.body.userName,passWord: req.body.passWord ,proxy: req.body.proxy },
        headers : {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }).on('complete', function(data, response) {
        console.log(data.result);
        res.set({ 'content-type': 'application/json; charset=utf-8' })
        res.send(data);
    });
});