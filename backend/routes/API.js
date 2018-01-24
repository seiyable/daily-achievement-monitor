var express = require('express');
var router = express.Router();
var HMAC_SHA256 = require('crypto-js/hmac-sha256');
var BASE64 = require('crypto-js/enc-base64');
var config = require('../config.js')

/* Subscribe to my twitter account acctivity using webhook */
router.post('/twitter/webhook', function(req, res, next) {
  console.log('there was a post request: ', req);
  console.log('--------------------------')
  // console.log(req)
});

/* Securing twitter webhooks */
router.get('/twitter/webhook', function(req, res, next) {
  console.log('there was a get request: ', req.query);
  var response_token = HMAC_SHA256(req.query.crc_token, config.consumer_secret);
  res.json({response_token: BASE64(response_token)});
});

module.exports = router;
