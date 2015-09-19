define(function(require, exports, module){
  var Backbone = require('backbone');

  var RenderModel = Backbone.Model.extend({
    defaults: {
      height: 400,
      width: 600
    },
    events: {
    },
    initialize: function(){
      this.on('change', this.setData, this);
    },
    setData: function(){
      /* On change, use setdata to update the chart */
      zingchart.exec(this.id, 'setdata',{
        data: this.get('data')
      });
    }
  });

  module.exports = RenderModel;
});