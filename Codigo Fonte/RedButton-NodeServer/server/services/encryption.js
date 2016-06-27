var crypto = require('crypto');

module.exports = {
    createSalt: function() {
        return crypto.randomBytes(128).toString('base64');
    },
    hashPwd: function(salt, pwd) {
        var hmac = crypto.createHmac('sha512', salt);
        hmac.setEncoding('hex');
        hmac.write(pwd);
        hmac.end();
        return hmac.read();
    },
    randomToken: function(tokenSize, tokenRange){
        var buf = crypto.randomBytes(tokenSize);
        var token = "";
        for (var t = 0; t < tokenSize; t++){
            token += tokenRange[parseInt(buf[t]) % tokenRange.length];
        }
        return token;
    },
    randomPassword: function(){
        var tokenSize = 9;
        var tokenRange = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        return module.exports.randomToken(tokenSize, tokenRange);
    },
    randomHexToken: function(size){
      return crypto.randomBytes(128).toString('hex').substring(0, size);
    }
};
