var RSAOAuth = require('../src/RSAOAuth');
var oauth = new RSAOAuth({
    expired : 30 * 60   //设置过期时间为30分钟
});
var express = require('express');
var app = express();

//express中间件，用于Token的访问验证
//第一个参数为Token验证失败时回调方法，第二个参数为无需验证的访问Path(可不填）
app.use(oauth.express(function(req, res){
    res.send({ code: 403, error: "Token Error." });
},[ '/login' ]));

//需要Token验证的方法
app.all('/access', function(req, res) {
    res.send({code: 200, user: req.token.user, role: req.token.role });
});

//无需Token验证的方法
app.all('/login', function(req, res) {
    res.send({code: 200, data: {
        //生成一个带用户及角色信息的Token
        token: oauth.createToken({ user: 'xiaosonl', role: 'admin'})
    }});
});

app.listen(3000);
console.log('app is running');

//验证
var request = require('request');
//登陆获取Token
request('http://localhost:3000/login', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
        var result = JSON.parse(body);
        token = result.data.token;
        //用Token访问其它服务
        request("http://localhost:3000/access?token=" + token, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        });
    }
});



