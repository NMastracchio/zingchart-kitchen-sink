zingchart.widgets.dashboard_container = {
    parse : function(data) {
        var x = data.x || 0;
        var y = data.y || 0;
        var w = data.width || 240;
        var h = data.height || 240;
        var id = data.id || "dash";        
        var backgroundColor1 = data.backgroundColor1 || "#232526";
        var backgroundColor2 = data.backgroundColor2 || "#202122";
        
        var json = {
            labels:[
            ],
            shapes:[
                {
                    type:"poly",
                    zIndex:-1000,
                    points:[[x,y],
                    [x+w+1,y],
                    [x,y+h+1]],
                    backgroundColor:backgroundColor1,
                    flat:true
                },
                {
                    type:"poly",
                    zIndex:-1000,
                    points:[[x+w,y+h],
                    [x+w,y],
                    [x,y+h]],
                    backgroundColor:backgroundColor1 + " " + backgroundColor2,
                    fillAngle:180,
                    fillOffsetX:w/4,
                    flat:true
                }
            ]
        };
        return json;
    }
};
 
zingchart.widgets.dashboard_datetime = {
    tinfo : function() {
        
        var dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var shmon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        var date = new Date();
        var hr = date.getHours(), min = date.getMinutes(), mod = 'AM';
        if (hr > 12) {
            hr -= 12;
            mod = 'PM';
        }
        hr = (hr < 10)?('0'+hr):hr;
        min = (min < 10)?('0'+min):min;
        
        return {
            dow: dow[date.getDay()],
            day: date.getDate() + " " + shmon[date.getMonth()] + " " + date.getFullYear(),
            time: hr + ":" + min + "<span style=\"font-size:39px\">" + mod + "</span>"
        };
    },
    update : function(chartid, snippetid, params) {
        var tinfo = zingchart.widgets.dashboard_datetime.tinfo();
        zingchart.exec(chartid, 'updateobject', {
            data : [
                {
                    type:"label",
                    id:snippetid+"_time_sh",
                    text:tinfo.time
                },{
                    type:"label",
                    id:snippetid+"_time",
                    text:tinfo.time
                }
            ]
        });
    },
    parse : function(data) {
        var x = data.x || 0;
        var y = data.y || 0;
        var w = data.width || 240;
        var h = data.height || 240;
        var id = data.id || "dash";
        var title = data.title || "";
        var value = data.value || "";
        var percent = data.percent || 0;
        
        var json = zingchart.widgets.dashboard_container.parse(data);
        
        window.setInterval(function() {
            zingchart.widgets.dashboard_datetime.update(data.loader.id, id, {
                time : Math.random()
            });
        }, 5000);
        
        var tinfo = zingchart.widgets.dashboard_datetime.tinfo();
 
        json.labels.push(
            {
                text:title,
                color:"#eee",
                fontSize:13,
                bold:true,
                x:x,
                y:y,
                width:w,
                textAlign:"left",
                padding:"8 8 8 28",
                flat:true
            },
            {
                text:tinfo.time,
                id:id+"_time_sh",
                color:"#000",
                fontSize:57,
                x:x+2,
                y:y+34,
                width:w,
                height:90,
                textAlign:"left",
                padding:"8 8 8 8",
                flat:true,
                backgroundImage:"PATTERN_NARROW_HORIZONTAL",
                vmlBackgroundImage:""
            },
            {
                text:tinfo.time,
                id:id+"_time",
                zIndex:1000,
                color:"#eee",
                fontSize:57,
                x:x,
                y:y+32,
                width:w,
                height:90,
                textAlign:"left",
                padding:"8 8 8 8",
                flat:true
            },
            {
                text:tinfo.dow,
                color:"#eee",
                fontSize:27,
                x:x+2,
                y:y+130,
                width:w,
                textAlign:"left",
                padding:"8 8 8 8",
                flat:true
            },
            {
                text:tinfo.day,
                color:"#eee",
                fontSize:27,
                x:x+2,
                y:y+164,
                width:w,
                textAlign:"left",
                padding:"8 8 8 8",
                flat:true
            }
        );
        
        json.shapes.push(
            {
                type:"line",
                points:[[x,y+33],
                [x+w,y+33]],
                lineWidth:1,
                lineColor:"#121314",
                flat:true
            },
            {
                type:"line",
                points:[[x,y+34],
                [x+w,y+34]],
                lineWidth:1,
                lineColor:"#303334",
                flat:true
            },
            {
                type:"line",
                points:[[x,y+126],
                [x+w,y+126]],
                lineWidth:1,
                lineColor:"#121314",
                flat:true
            },
            {
                type:"line",
                points:[[x,y+127],
                [x+w,y+127]],
                lineWidth:1,
                lineColor:"#303334",
                flat:true
            }
        );
        
        return json;
    }
}
 
zingchart.widgets.dashboard_metric = {
    percent : function(percent) {
        var ps = (String(Math.abs(percent))).split('.');
        var p1 = ps[0] || '0';
        var p2 = ps[1] || '00';
        return p1 + "<span style=\"font-size:39px\">." + p2 + "%</span>";
    },
    update : function(chartid, snippetid, params) {
        var value = parseFloat(Number(1000*Math.random()).toFixed(2));
        var percent = parseFloat(Number(-10 + 20*Math.random()).toFixed(2));
        zingchart.exec(chartid, 'updateobject', {
            data:[
                {
                    objtype:"label",
                    id:snippetid+"_value_sh",
                    text:value
                },{
                    objtype:"label",
                    id:snippetid+"_value",
                    text:value
                },{
                    objtype:"label",
                    id:snippetid+"_percent",
                    color:(percent>0)?"#77AB13":"#AE432E",
                    text:zingchart.widgets.dashboard_metric.percent(percent)
                },{
                    objtype:"shape",
                    id:snippetid+"_trend",
                    angle:(percent>0)?0:180,
                    backgroundColor:(percent>0)?"#77AB13":"#AE432E"
                }
            ]
        });
    },
    parse : function(data) {
        var x = data.x || 0;
        var y = data.y || 0;
        var w = data.width || 240;
        var h = data.height || 240;
        var id = data.id || "dash";
        var title = data.title || "";
        var value = data.value || "";
        var percent = data.percent || 0;
    
        var json = zingchart.widgets.dashboard_container.parse(data);
        
        window.setInterval(function() {
            zingchart.widgets.dashboard_metric.update(data.loader.id, id, {
                
            });
        }, 2000+parseInt(2000*Math.random(), 10));
        
        json.labels.push(
            {
                text:title,
                color:"#eee",
                fontSize:13,
                bold:true,
                x:x,
                y:y,
                width:w,
                textAlign:"left",
                padding:"8 8 8 28",
                flat:true
            },
            {
                text:value,
                id:id+"_value_sh",
                color:"#000",
                fontSize:57,
                x:x+12,
                y:y+42,
                flat:true
            },
            {
                text:value,
                id:id+"_value",
                color:"#eee",
                fontSize:57,
                x:x+10,
                y:y+40,
                flat:true
            },
            {
                text:zingchart.widgets.dashboard_metric.percent(percent),
                id:id+"_percent",
                color:(percent>0)?"#77AB13":"#AE432E",
                fontSize:47,
                x:x+50,
                y:y+105,
                flat:true
            }        
        );
    
        json.shapes.push(
            {
                type:"line",
                points:[[x,y+33],
                [x+w,y+33]],
                lineWidth:1,
                lineColor:"#121314",
                flat:true
            },
            {
                type:"line",
                points:[[x,y+34],
                [x+w,y+34]],
                lineWidth:1,
                lineColor:"#303334",
                flat:true
            },
            {
                type:"circle",
                x:x+16,
                y:y+16,
                size:6,
                fillAngle:45,
                fillOffsetX:4,
                fillOffsetY:4,
                backgroundColor:"#556D2C #384820",
                flat:true
            },
            {
                type:"triangle",
                id:id+"_trend",
                shadow:true,
                shadowDistance:2,
                shadowColor:"#000",
                x:x+30,
                y:y+140,
                size:16,
                angle:(percent>0)?0:180,
                backgroundColor:(percent>0)?"#77AB13":"#AE432E",
                flat:true
            }
        );
        return json;
    }
};
 
zingchart.widgets.dashboard_accounts = {
    update : function(chartid, snippetid, params) {
        zingchart.exec(chartid, 'setseriesvalues', {
            graphid : snippetid+"_graph",
            values : [
                [10+parseInt(100*Math.random(), 10)],
                [10+parseInt(100*Math.random(), 10)],
                [10+parseInt(100*Math.random(), 10)]
            ],
            smart:true
        });
    },
    parse : function(data) {
        var x = data.x || 0;
        var y = data.y || 0;
        var w = data.width || 240;
        var h = data.height || 240;
        var id = data.id || "dash";
        
        var json = zingchart.widgets.dashboard_container.parse(data);
        
        window.setInterval(function() {
            zingchart.widgets.dashboard_accounts.update(data.loader.id, id, {});
        }, 5000);
 
        json.graphs = json.graphs || [];
        json.graphs.push({
            id:id+"_graph",
            backgroundColor:"none",
            type:"pie",
            x:x,
            y:y,
            width:w,
            height:h,
            scale:{
                sizeFactor:0.65
            },
            plotarea:{
                margin:"10 10 40 10"  
            },
            title:{
                text:"Accounts",
                backgroundColor:"none",
                color:"#fff"
            },
            legend:{
                shadow:false,
                borderWidth:0,
                backgroundColor:"none",
                margin:"auto auto 10 auto",
                layout:"float",
                item:{
                    margin:2,
                    padding:2,
                    color:"#fff"
                },
                marker:{
                    type:"default",
                    width:15,
                    height:10,
                    borderRadius:3,
                    borderWidth:0
                }
            },
            plot:{
                _animation:{
                    speed:500,
                    method:0,
                    effect:3
                },
                shadow:false,
                valueBox:{
                    visible:false
                },
                slice:20
            },
            series:[
                {
                    values:[103],
                    text:"Free",
                    backgroundColor:"#058DC7"
                },
                {
                    values:[37],
                    text:"Basic",
                    backgroundColor:"#50B432"
                },
                {
                    values:[192],
                    text:"Premium",
                    backgroundColor:"#EF561A"
                }
            ]
        });
        
        return json;
    }
};