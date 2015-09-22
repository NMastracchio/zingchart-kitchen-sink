define(function(require, exports, module){
  var Backbone = require('backbone');

  var InfoModel = Backbone.Model.extend({
    defaults: {
      theme: 'zingchart'
    },
    initialize: function(){
      this.on('change', this.changeTheme, this);
    },
    changeTheme: function(){
      
    }
  });

  module.exports = InfoModel;
});