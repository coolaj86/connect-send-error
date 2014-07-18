'use strict';

var connect = require('connect')
  , app = connect()
  , send = require('./index')
  , port = 8070
  , codes
  ;

codes = {
  'BAD_ROBOT': { message: "You appear to be a spambot", statusCode: 400 }
, 'NOT_IMPL': { message: "Not Implemented", statusCode: 500 }
};

app
  .use(send.error({ codes: codes }))
  .use(function (req, res) {
    res.statusCode = 501;
    res.error('NOT_IMPL');
  })
  ;

app.listen(port, function () {
  console.log('Listening on http://localhost:' + port);
});
