'use strict';

module.exports.error = function (opts) {
  opts = opts || {};

  var errors = opts.codes || {}
    ;

  function sendResponse(code, message, statusCode) {
    /*jshint validthis:true*/
    var res = this
      , data
      ;

    if (!res) {
      throw new Error('You called `error()`, detatched send from the response object');
    }

    code = code || 'UKN';
    message = message || (errors[code] && errors[code].message) || 'Unknown error occurred';
    statusCode = statusCode || (errors[code] && errors[code].statusCode) || '200';
    data = { code: code, message: message };

    res.setHeader('Content-Type', 'application/json');
    //res.statusCode = statusCode;
    if (code && 'object' === typeof code) {
      data = code;
    }
    res.end(JSON.stringify({ error: data }, null, '  '));
  }

  function attach(req, res, next) {
    if (!res.error) {
      res.error = sendResponse;
    }
    next();
  }

  return attach;
};
