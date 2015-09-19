define(function(require, exports, module) {
  var Backbone = require('backbone');
  var ChartModel = require('../models/chart');

  var ChartCollection = Backbone.Collection.extend({
    model: ChartModel
  });

  module.exports = ChartCollection;
});