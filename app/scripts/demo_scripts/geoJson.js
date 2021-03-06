zingchart.maps.loadGeoJSON({
  id: "india",
  url: "https://api.myjson.com/bins/20ylc",
  callback: function(){
    zingchart.exec('geoJson','destroy');
    zingchart.render({
      id:'geoJson',
      width:600,
      height:600,
      data:{
        "theme":"light",
        "title":{
          "text":"GeoJSON Support"
        },
        "shapes": [
          {
            "type": "zingchart.maps",
            "options":{
              "name": "india",
              "style": {
                "label": {
                  "visible":false
                }
              }
            }
          }
        ]
      }
    });
  }
});