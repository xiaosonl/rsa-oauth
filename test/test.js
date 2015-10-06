var RSAOAuth = require('../src/RSAOAuth');
console.log(RSAOAuth);
var oauth = new RSAOAuth({
    expired : 30 * 60   //30分钟
});
oauth.loadPrivateKey();
var oauth2 = new RSAOAuth();
oauth2.loadPublicKey();

var token = oauth.createToken();
console.log("The Token is:" + token);
console.log("The TokenObj is: ", JSON.stringify(oauth2.getToken(token)));

var tokenID = oauth.createTokenID(123);
console.log("The TokenID is : ", tokenID);
console.log("The ID is :", oauth2.getTokenID(tokenID));

