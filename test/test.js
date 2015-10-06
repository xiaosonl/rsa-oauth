var RSAOAuth = require('../src/RSAOAuth');
console.log(RSAOAuth);
var oauth = new RSAOAuth({
    expired : 30 * 60   //30分钟
});
var token = oauth.createToken();
console.log("New Token: " + token);
console.log("The Token is " + oauth.getToken(token).isExpired);
var tokenID = oauth.createTokenID(1235234);
console.log("New TokenID: " + tokenID);
console.log("The ID is " + oauth.getTokenID(tokenID));