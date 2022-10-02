
var CryptoJS = require("crypto-js");

const username = ""
const app_client_id = ""
const app_client_secret = ""

const message = username + app_client_id;
const key = app_client_secret;

const secret_hash = CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA256(
        message,
        key
    )
);

console.log(secret_hash);
