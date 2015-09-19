define(function(require, exports, module) {
  var app = require('app');
  var Router = require('router');
  var Backbone = require('backbone');

  app.router = new Router();
  Backbone.history.start();

  module.exports = app.router;
});