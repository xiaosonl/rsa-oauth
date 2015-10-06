/**
 * Created by macair on 15/10/6.
 */

var NodeRSA = require('node-rsa')
    ,fs = require("fs");
//Init RSA
var public_key_name = 'pkcs1-public.key';
var private_key_name = 'pkcs1-private.key';

module.exports = (function(){
    function RSAOAuth(options){
        this.options = options;
        this.key = new NodeRSA({b : 512});
    }

    RSAOAuth.prototype.loadPublicKey = function(){
        var public_key_data = '';
        if(fs.existsSync(public_key_name)){
            public_key_data = fs.readFileSync(public_key_name);
            this.key.importKey(public_key_data, "pkcs1-public");
            console.log("import public key from file:" + public_key_name);
        }else{
            public_key_data = this.key.exportKey('pkcs1-public');
            console.log("create public key file:" + public_key_name);
            fs.writeFileSync(public_key_name, public_key_data)
        }
        console.log(public_key_data.toString());
    }

    RSAOAuth.prototype.loadPrivateKey = function(){
        var private_key_data ='';
        if(fs.existsSync(private_key_name)){
            private_key_data = fs.readFileSync(private_key_name);
            this.key.importKey(private_key_data, "pkcs1-private")
            console.log("import private key from file:" + private_key_name);
        }else{
            private_key_data = this.key.exportKey('pkcs1-private');
            console.log("create private key file:" + private_key_name);
            fs.writeFileSync(private_key_name, private_key_data)
        }
        console.log(private_key_data.toString());
    }

    RSAOAuth.prototype.createToken = function (state) {
        var token = {
            createTime: new Date(),
            state: state
        }
        if(this.options){
            token.expired = this.options.expired;
        }
        var tokenJson = JSON.stringify(token);
        return this.key.encryptPrivate(tokenJson, "base64").toString();
    }

    RSAOAuth.prototype.createTokenID = function (id) {
        return this.createToken({ id: id });
    }

    RSAOAuth.prototype.getTokenID = function (tokenID) {
        var tokenObj = this.getToken(tokenID);
        if(tokenObj.isExpired){
            return null;
        }else{
            return tokenObj.state.id;
        }
    }

    RSAOAuth.prototype.getToken = function(token) {
        var tokenJson = this.key.decryptPublic(token, 'utf-8');
        var tokenObj = JSON.parse(tokenJson);
        if (tokenObj && tokenObj.createTime) {
            var now = new Date();
            var createTime = new Date(tokenObj.createTime);
            var seconds = (now - createTime) / 1000;
            tokenObj.isExpired = seconds > tokenObj.expired;
            return tokenObj;
        }else{
            return null;
        }
    }

    return RSAOAuth;
})();