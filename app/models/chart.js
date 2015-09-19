define(function(require, exports, module) {
  var RenderModel = require('./render');

  var ChartModel = Backbone.Model.extend({
    defaults: {
      render: new RenderModel()
    },
    initialize: function(attributes, options){
      if (attributes.render) {
        this.set('render', new RenderModel(attributes.render));
      }
    },
    render: function(){
    }
  });
 
  module.exports = ChartModel;
});