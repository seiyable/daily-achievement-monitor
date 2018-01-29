var express = require('express');
var router = express.Router();
var HMAC_SHA256 = require('crypto-js/hmac-sha256');
var BASE64 = require('crypto-js/enc-base64');
var config = require('./config.js')
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

// ===================================================================
/* Subscribe to my twitter account acctivity using webhook */
router.post('/twitter/webhook', function(req, res, next) {
  console.log('POST on /twitter/webhook');
  console.log('req', req);
  console.log('--------------------------');
});

/* Securing twitter webhooks */
router.get('/twitter/webhook', function(req, res, next) {
  console.log('GET on /twitter/webhook');
  console.log('req.query', req.query);
  var response_token = HMAC_SHA256(req.query.crc_token, config.consumer_secret);
  res.json({response_token: BASE64(response_token)});
});

/* Return the list of numebers of tweets you made on each day in recent 30 days */
router.get('/twitter', function(req, res, next) {
  var params = {
    screen_name: 'iiyon5884',
    count: 200
  };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    var data = []

    if (error) {
      console.log('there was an error on fetching tweets.', error)
      res.status(400)
      res.send('Error on fetching tweets.')
    } else {
      for (var i = 0; i < tweets.length; i++) {
        var id = tweets[i].id
        var created_at = tweets[i].created_at
        var text = tweets[i].text

        var unix = new Date(created_at).getTime()
        console.log('d', unix)

        data.push({
          id: id,
          created_at: unix,
          text: text
        })
      }
      res.json({data:data})
    }
  });

});

module.exports = router;
