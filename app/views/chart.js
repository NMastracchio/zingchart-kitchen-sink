define(function(require, exports, module){
  var Backbone = require('backbone');
  var ChartCollection = require('collections/charts');

  /* Chart collection view */
  var ChartCollectionView = Backbone.View.extend({
    el: '#zc-current-view',
    file: null,
    template: _.template($('#ChartTemplate').html()),
    initialize: function(attributes){
      console.log(this.template);
      var self = this;
      this.file = attributes.file;
      /* Create new collection */
      this.coll = new ChartCollection();
      /* Read chart objects from file */
      $.getJSON(self.file, function(data) {
        /* Add array of chart objects to collection */
        self.coll.add(data);
        /* Render the template */
        self.render();
      });
      //this.listenTo(this.coll, 'add', this.render);
    },
    events: {
      'change .aspect-select': 'updateAspect',
      'click a': 'updateChart',
      'change [id^="mixedChart"]': 'changeMixed'
    },
    destroyCharts: function(){
      this.coll.each(function(chart){
        var chartId = chart.get('render').attributes.id;
        zingchart.exec(chartId, 'destroy');
      });
    },
    render: function() {
      /* Creates the chart <div> elements */
      this.$el.html(this.template({ charts: this.coll.toJSON() }));
      this.coll.each(function(chart){
        var config = chart.get('render').attributes;
        var script = chart.attributes.script;
        if (script) {
          $.getScript(script, function(){
            var currentTheme = $('#theme-picker').val();
              // Initial render of the chart 
              if (config.data){
                if (config.data.graphset && config.data.graphset.length >= 1){
                  for (var n = 0; n < config.data.graphset.length; n++){
                    config.data.graphset[n].theme = currentTheme;
                  }
                } else {
                  config.data.theme = currentTheme;
                }
                zingchart.render(config);
              }
          });
        } else {
          var currentTheme = $('#theme-picker').val();
          // Initial render of the chart
          if (config.data){
            if (config.data.graphset && config.data.graphset.length >= 1){
              for (var n = 0; n < config.data.graphset.length; n++){
                config.data.graphset[n].theme = currentTheme;
              }
            } else {
              config.data.theme = currentTheme;
            }
            zingchart.render(config);
          }
        }
        
      });

      /* 
      * We are keeping track of the number of charts that are in a page, and 
      * how many have been loaded so that we can raise the loading shutter
      * after all of the chart in the page have been raised.
      */
      var numToRender = 0;
      var numRendered = 0;

      /* 
      * Go through each of the models in the collection,
      * if the model has a render attr, we must wait for it to render
      * before raising the loading shutter. Some charts use iframes which will
      * not trigger the zingchart.load event, so we don't want to get the
      * shutter locked in those cases.
      */
      this.coll.each(function(model){
        if (model.attributes.render.attributes.data) {
          numToRender++;
        }
      });

      /*
      * If numToRender is 0, there are no charts that need to be loaded within
      * the page, so raise the shutter.
      */
      console.log(numToRender);
      if (!numToRender) {
        window.setTimeout(function(){
          $('#loading-shutter').animate({
            top: "-=1080"
          },500);
        },1000);
      }

      /*
      * After each chart has been loaded, increment numRendered and check to
      * see if it equals the total number of charts that must be rendered
      */
      zingchart.load = function(){
        numRendered++;
        if (numRendered == numToRender) {
          $('#loading-shutter').animate({
            top: "-=1080"
          },500);
        }
      };
      return this;
    },
    unbindEvents: function(){
      this.unbind();
    },
    updateAspect: function(event){
      var chartId = $(event.target).attr('id').split('-')[0];
      var val = $(event.target).val();

      /* Find the chart model by id in the collection */
      var model = this.coll.find( function(model) { 
        return model.get('render').get('id') == chartId; 
      });

      /* Clone the data object from the render object */
      var modelData = _.clone(model.get('render').get('data'));
      var modelStates = _.clone(model.get('states'));

      /* Switch to handle some special cases */ 
      switch(chartId){
        case 'pieChart':
          //console.log(modelStates.is3d);
          if (val == 'nestedpie') {
            //console.log('nestedpie');
            modelData = modelStates.nestedpie2d.data;
            modelStates.currentType = 'nestedpie2d';
          } else if (val == 'ring') {
            if (modelStates.is3d) {
              //console.log('ring3d');
              modelData = modelStates.ring3d.data;
              modelStates.currentType = 'ring3d';
            } else {
              //console.log('ring2d');
              modelData = modelStates.ring2d.data;
              modelStates.currentType = 'ring2d';
            }
          } else {
            if (modelStates.is3d) {
              //console.log('pie3d');
              modelData = modelStates.pie3d.data;
              modelStates.currentType = 'pie3d';
            } else {
              //console.log('pie2d');
              modelData = modelStates.pie2d.data;
              modelStates.currentType = 'pie2d';
            }
          }
          break;
        case 'treemapVis':
          modelData.options = {
            "split-type": val
          };
          break;
        case 'wordcloudVis':
          modelData.options.aspect = val;
          break;
        case 'toggleAction':
          modelData.legend['toggle-action'] = val;
          break;
        case 'radarChart':
          if (val == 'mixed') {
            modelData.series = modelStates.altSeries;
          } else {
            modelData.series = modelStates.ogSeries;
          }
        default:
          if (modelData.plot) {
            modelData.plot.aspect = val;
          } else {
            modelData.plot = {
              aspect: val
            };
          }
          break;
      }
      
      /* 
      * Set new chart config and trigger 'change'.
      * Bonus points if you can figure out why change only gets triggered
      * naturally once per model! 
      */
      model.get('render').set('data', modelData);
      model.get('render').trigger('change');
    },
    updateChart: function(event){
      var idAttrs = $(event.target).attr('id').split('-');
      var chartId = idAttrs[0];
      var action = idAttrs[1];

      /* Find the model by chart id */
      var model = this.coll.find( function(model) { 
        return model.get('render').get('id') == chartId; 
      });

      /* Clone the data and state objects */
      var modelData = _.clone(model.get('render').get('data'));
      var modelStates = _.clone(model.get('states'));

      /* Main actions include toggling 3d, rotating. */
      switch (action) {
        case '3d':
          if (modelStates.is3d) {
            if (chartId == 'pieChart') {
              var currentType = modelStates.currentType;
              switch(currentType) {
                case 'pie3d':
                  //console.log('pie3d -> pie2d');
                  modelData = modelStates.pie2d.data;
                  modelStates.currentType = 'pie2d';
                  break;
                case 'ring3d':
                  //console.log('ring3d -> ring2d');
                  modelData = modelStates.ring2d.data;
                  modelStates.currentType = 'ring2d';
                  break;
                case 'nestedpie3d':
                  //console.log('nestedpie2d -> nestedpie2d');
                  modelData = modelStates.nestedpie2d.data;
                  modelStates.currentType = 'nestedpie2d';
                  break;
              }
            } else {
              modelData.type = modelData.type.slice(0, modelData.type.length - 2);
            }
          } else {
            /* Special case for pie chart, the bane of my existence. */
            if (chartId == 'pieChart') {
              var currentType = modelStates.currentType;
              switch(currentType) {
                case 'pie2d':
                  //console.log('pie2d -> pie3d');
                  modelData = modelStates.pie3d.data;
                  modelStates.currentType = 'pie3d';
                  break;
                case 'ring2d':
                  //console.log('ring2d -> ring3d');
                  modelData = modelStates.ring3d.data;
                  modelStates.currentType = 'ring3d';
                  break;
                case 'nestedpie2d':
                  //console.log('nestedpie2d -> nestedpie3d');
                  modelData = modelStates.nestedpie3d.data;
                  modelStates.currentType = 'nestedpie3d';
                  break;
              }
            } else {
              modelData.type += '3d';
            }
          }
          modelStates.is3d = !modelStates.is3d;
          break;
        case 'rotate':
          if (modelStates.isRotated) {
            modelData.type = modelStates.orientations[0];
          } else {
            modelData.type = modelStates.orientations[1];
          }
          modelStates.isRotated = !modelStates.isRotated;
          break;
        case 'markers':
          if (modelStates.currentMarker != modelStates.markers.length - 1) {
            modelStates.currentMarker++;
            modelData.plot.marker = modelStates.markers[modelStates.currentMarker]
          } else {
            modelStates.currentMarker = 0;
            modelData.plot.marker = modelStates.markers[modelStates.currentMarker];
          }
          break;
        case 'stack':
          if (modelStates.stacktype) {
            modelData['stack-type'] = modelStates.stacktypes[0];
          } else {
            modelData['stack-type'] = modelStates.stacktypes[1];
          }
          modelStates.stacktype = !modelStates.stacktype;
          break;
      }

      /* 
      * Set the new states object, chart config object, trigger 'change'. 
      * Still having the same problem with the model 'change' event only
      * triggering once.
      */
      model.set('states', modelStates);
      model.get('render').set('data', modelData);
      model.get('render').trigger('change');
    },
    changeMixed: function(event){
      var idAttrs = $(event.target).attr('id').split('-');
      var chartId = idAttrs[0];
      var plotId = idAttrs[1];
      var val = $(event.target).val();
      
      zingchart.exec(chartId, 'modifyplot', {
        plotid: plotId,
        data: {
          type: val
        }
      });
    }
  });

  module.exports = ChartCollectionView;
});