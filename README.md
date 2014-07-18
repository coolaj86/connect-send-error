connect-send-error
=================

Adds the `response.error()` middleware to connect and connect-like http stacks.

```javascript
res.error(code, message, statusCode);

// returns this to the user with the appropriate content-type and status code
{ "error": {
    "code": "S_MSG"
  , "message": "some message"
  }
}
```

If you supply a codes table it will use the message and status code from the table.

The default status code will be `400` (Bad Request).

The default error code will be `UKN` (Unknown Error).

Usage
=====

```javascript
'use strict';

var connect = require('connect')
  , app = connect()
  , send = require('connect-send-error')
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

module.exports = app;
```
