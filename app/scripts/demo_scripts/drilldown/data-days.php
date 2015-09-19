<?php
$days = 30;
if (in_array($_GET['monthindex'], array(0,2,4,6,7,9,11))) {
  $days = 31;
} else if (in_array($_GET['monthindex'], array(1))) {
  $days = 28;
}
?>

{
  "graphset" : [
    {
      "id" : "days",
      "x" : "0%",
      "y" : "70%",
      "width" : "100%",
      "height" : "30%",
      "type" : "area",
      "plotarea" : {
        "margin-top":30,
              "margin-right":30,
              "margin-bottom":40,
              "margin-left":50
      },
      "plot":{
        "monotone":1
      },
      "scale-x" : {
        "values" : "1:<?php echo $days; ?>",
        "max-items" : 99,
        "items-overlap":1,
        "tick":{
                  "line-color":"#AFB2AF",
                   "line-width":"1px"
              },
              "item":{
                  "font-color":"#59514E",
                  "font-size":10
              },
              "guide":{
                  "line-color":"#E8E7E8",
                  "line-style":"dotted",
                  "line-width":3
              }
      },
      "scale-y" : {
        "min-value" : 0
      },
      "tooltip" : {
        "visible" : false
      },
      "guide" : {
        "value-label" : {
          "padding" : "10 20",
          "border-radius" : 15,
          "border-width" : 2,
          "border-color" : "#fff"
        },
        "marker" : {
          "type" : "circle",
          "size" : 3,
          "background-color" : "#77BCE0"
        }
      },
      "series" : [
        {
          "values" : [
          <?php
          $s = '';
          for ($i=0;$i<$days;$i++) {
            $s .= intval(20 + rand(-10, 20)) . ',';
          }
          echo substr($s, 0, -1);
          ?>
          ],
          "line-color":"#0096c8",
          "marker" : {
            "type" : "circle",
            "size" : 3,
            "background-color" : "#39b9ed",
            "border-width":1,
            "border-color":"#fff"
          }
        }
      ],
      "labels" : [
        {
          "x" : 50,
          "y" : 0,
          "color":"black",
          "background-color":"white",
          "alpha":0.8,
          "border-radius-bottom-left":5,
          "border-radius-bottom-right":5,
          "border-right":"1px solid #ddd",
          "border-left":"1px solid #ddd",
          "border-bottom":"1px solid #ddd",
          "text" : "Daily stats for <?php echo $_GET['monthname']; ?>, <?php echo $_GET['year']; ?>"
        }
      ]
    }
  ]
}