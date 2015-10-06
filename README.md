# RSAOAuth

Node.js OAuth Library used RSA<br/>

## Example

```javascript
var RSAOAuth = require('rsa-oauth');
console.log(RSAOAuth);
var oauth = new RSAOAuth({
    expired : 30 * 60
});
var token = oauth.createToken();
console.log("New Token: " + token);
console.log("The Token is " + oauth.getToken(token).isExpired);
var tokenID = oauth.createTokenID(1235234);
console.log("New TokenID: " + tokenID);
console.log("The ID is " + oauth.getTokenID(tokenID));

## Installing

```shell
npm install rsa-oauth