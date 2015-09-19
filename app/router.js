define(function(require, exports, module) {
  var Backbone = require('backbone');
  var MainView = require('views/main');
  var ChartView = require('views/chart');

  var Router = Backbone.Router.extend({
    currentView: null,
    initialize: function(){
      var mainView = new MainView();
    },
    routes: {
      ''                : 'charts',
      'charts'          : 'charts',
      'maps'            : 'maps',
      'visualizations'  : 'visualizations',
      'interactive'     : 'interactive',
      'markers'         : 'markers',
      'design'          : 'design',
      'customization'   : 'customization',
      'integration'     : 'integration'
    },
    charts: function(){
      if (this.currentView) {
        this.currentView.unbindEvents();  
      }

      this.setRouteActive('charts');
      var view = new ChartView({file: './dist/scripts/json/standard.json'});
      this.currentView = view;
    },
    maps: function(){
      if (this.currentView) {
        this.currentView.unbindEvents();  
      }

      this.setRouteActive('maps');
      var view = new ChartView({file: './dist/scripts/json/maps.json'});
      this.currentView = view;
    },
    visualizations: function(){
      if (this.currentView) {
        this.currentView.unbindEvents();  
      }

      this.setRouteActive('visualizations');
      var view = new ChartView({file: './dist/scripts/json/visualizations.json'});
      this.currentView = view;
    },
    interactive: function(){
      if (this.currentView) {
        this.currentView.unbindEvents();  
      }

      this.setRouteActive('interactive');
      var view = new ChartView({file: './dist/scripts/json/interactive.json'});
      this.currentView = view;
    },
    markers: function(){
      if (this.currentView) {
        this.currentView.unbindEvents();  
      }

      this.setRouteActive('markers');
      var view = new ChartView({file: './dist/scripts/json/markers.json'});
      this.currentView = view;
    },
    design: function(){
      if (this.currentView) {
        this.currentView.unbindEvents();  
      }

      this.setRouteActive('design');
      var view = new ChartView({file: './dist/scripts/json/design.json'});
      this.currentView = view;
    },
    customization: function(){
      if (this.currentView) {
        this.currentView.unbindEvents();  
      }

      this.setRouteActive('customization');
      var view = new ChartView({file: './dist/scripts/json/customization.json'});
      this.currentView = view;
    },
    integration: function(){
      if (this.currentView) {
        this.currentView.unbindEvents();  
      }

      this.setRouteActive('integration');
      var view = new ChartView({file: './dist/scripts/json/integration.json'});
      this.currentView = view;
    },
    setRouteActive: function(current){
      var listElem = $("div.flex-nav").find("[data-route='" + current + "']");
      listElem.addClass('active');
      listElem.siblings().removeClass('active');
    }
  });

  module.exports = Router;
});