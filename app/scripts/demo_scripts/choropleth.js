zingchart.defineModule("choropleth", "chart", function (originalJson) {
  
  /*** Helper Functions ***/
  function generateDomain (type, domain, range) {
    var scale;
    if (type == 'quantize') {
      scale = quantizeDomain(domain, range);
    }
    else {
      scale = domain;
    }
    return scale;
  }

  function quantize (value, domain, range) {
    var index = quantizeIndex(value,domain);
    return range[index];
  }

  function threshold (value, domain, range) {
    var index = thresholdIndex(value, domain);
    return range[index];
  }
  
  function thresholdIndex (value, scale) {
    for (var i=0; i<scale.length; i++) {
      if (value < scale[i]) {
        return i;
      }
    }
    return scale.length;
  }

  /* Check for options */
  if (originalJson.options) {
    var options = originalJson.options;
    var mapType = options.map;
    var scaleType = options.scale.type;
    var range = options.scale.range;
    var domain = generateDomain(scaleType, options.scale.domain, range);
    var scaleFunction = (scaleType == "quantize" ? quantize : threshold);
    // Initialize items object
    var items = {};
    // Iterate over options items
    options.items.forEach(function (item) {
      var name = item.name;
      var value = item.value;
      var backgroundColor = scaleFunction(value, domain, range);
      items[name] = {
        "background-color": backgroundColor
      };
    });
    // Set specific maps details
    var styleJson = options.style ? options.style : {};
    styleJson.items = items;
    var resultJson = {
      "type": "zingchart.maps",
      "options": {
        "id": "map",
        "name": mapType,
        "scale": true,
        "style": styleJson
      }
    };
    if (originalJson.shapes) {
      originalJson.shapes.push(resultJson);
    }
    else {
      originalJson.shapes = [resultJson];
    }
  }
  else {
    console.error("Whoa there... You need an `options` object to set the styles.");
  }
  
  /* Return modified JSON */
  return originalJson;
});