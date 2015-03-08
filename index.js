'use strict';

module.exports.error = function (opts) {
  opts = opts || {};

  var errors = opts.codes || {};

  /*
  function getName(obj) {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec((obj).constructor.toString());

   return (results && results.length > 1) ? results[1] : "";
  }
  // 'Error' === getName(new Error('foo'))
  */

  function sendResponse(code, message, statusCode) {
    /*jshint validthis:true*/
    var res = this;
    var data;
    var result;

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
      if (code.error) {
        code = code.error;
      }
      if (/message/.test(JSON.stringify(code))) {
        // '{}' !== JSON.stringify(code)
        data = code;
      } else {
        data = { type: code.type, name: code.name, message: code.message || code.toString() };
      }
    }

    result = JSON.stringify({ error: data }, null, '  ');
    res.end(result);
  }

  function attach(req, res, next) {
    if (!res.error) {
      res.error = sendResponse;
    }
    next();
  }

  return attach;
};
