define(function(require, exports, module){
  var Backbone = require('backbone');

  /* Overall view for the new sink */
  var KitchenSinkView = Backbone.View.extend({
    el: '#zc-kitchen-sink',
    template: _.template($('#SinkTemplate').html()),
    initialize: function(){
      this.render(); 
    },
    events: {
      'click li': 'changeRoute',
      'change #theme-picker': 'changeTheme'
    },
    render: function(){
      this.$el.html(this.template());
      return this;
    },
    changeRoute: function(event){
      $('#loading-shutter').animate({
        top: "+=1080"
      },500, function(){
        var router = require('../main');
        var routeName = $(event.target).data('route');
        router.navigate(routeName, {trigger: true});
      });
    },
    changeTheme: function(event){
      /* 
      * Helper function that takes a model and a theme name, 
      * destroys the model's currently rendered chart, and sets the 
      * theme name. 
      */
      var router = require('../main');
      var applyTheme = function(model, themeName){
        var renderModel = model.get('render');
        var modelData = _.clone(renderModel.get('data'));

        zingchart.exec(renderModel.attributes.id, 'destroy');

        modelData.theme = themeName;
        renderModel.set('data',modelData);
      };

      var val = $(event.target).val();
      var collection = router.currentView.coll;

      router.currentView.destroyCharts();

      switch(val){
        case 'zingchart':
          collection.each(function(chart){
            applyTheme(chart, 'zingchart');
          });
          router.currentView.render();
          break;
        case 'dark':
          collection.each(function(chart){
            applyTheme(chart, 'dark');
          });
          router.currentView.render();
          break;
        case 'windows-xp':
          collection.each(function(chart){
            applyTheme(chart, 'classic');
          });
          router.currentView.render();
          break;
      }
    }
  });

  module.exports = KitchenSinkView;
});