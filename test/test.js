var RSAOAuth = require('../src/RSAOAuth');
console.log(RSAOAuth);
var oauth = new RSAOAuth({
    expired : 30 * 60   //30分钟
});
var oauth2 = new RSAOAuth();

var token = oauth.createToken({ userid:'xiaosonl', role:'admin'});
console.log("The Token is:" + token);
console.log("The TokenObj is: ", JSON.stringify(oauth.getToken(token)));

var tokenID = oauth.createTokenID(123);
console.log("The TokenID is : ", tokenID);
console.log("The ID is :", oauth2.getTokenID(tokenID));

/**********************************************/

var express = require('express');
var app = express();

app.use(oauth.express(function(req, res){
    res.send({ code: 403, error: "Token Error." });
},[ '/login' ]));

app.all('/access', function(req, res) {
    res.send({code: 200});
});

app.all('/login', function(req, res) {
    res.send({code: 200, data: {
        token: oauth.createToken({ user: 'xiaosonl', role: 'admin'})
    }});
});

app.listen(3001);
console.log('app is running');

