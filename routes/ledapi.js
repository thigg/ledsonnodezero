var express = require('express');
module.exports = function(ledapi){
  var router = express.Router();
  /* Post for leds*/
  router.post('/show', function(req, res, next) {
    ledapi.stdin.write('show\n'+req.body.colors+'\n')
    console.log("Showing: "+ req.body.colors);
    res.send();
  });

  /* delete request for leds*/
  router.post('/wipe', function(req, res, next) {
    ledapi.stdin.write('wipe\n\n')
    res.send();
  });
  return router;
}
