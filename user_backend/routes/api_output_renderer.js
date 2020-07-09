'use strict';
//const url = require('url');

module.exports = {
  render: function(req, res, next) {
    let response = {
      code: 'ok',
      error: null,
      response: req.response
    }
    
    res.status(200);
    res.json(response);
    res.end();
  },

  renderError : function(err,req, res, next){
    res.status(err.httpCode || 404);
    let response = {
      code: (err.errorCode || err.message),
      error: err.message,
      response: null
    };
    req.responseErrorMessage = err.message;
    res.json(response);
    res.end();
  }
};