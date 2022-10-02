
var CryptoJS = require("crypto-js");

var ConvertString = require('convert-string');

const username = "surajpotnuru"
const app_client_id = "44pbsn8lpb0n4fpionja0cj0tj"
const app_client_secret = "idrofs847n0ealmokc842b42cd5kqu477djockv9gkq8vsfmouv"

const message = username + app_client_id;
const key = app_client_secret;

const secret_hash = CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA256(
        message,
        key
    )
);

console.log(secret_hash);
