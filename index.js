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
    statusCode = statusCode || (errors[code] && errors[code].statusCode) || '500';
    data = { error: { code: code, message: message } };

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = statusCode;
    res.end(JSON.stringify(data, null, '  '));
  }

  function attach(req, res, next) {
    if (!res.error) {
      res.error = sendResponse;
    }
    next();
  }

  return attach;
};
