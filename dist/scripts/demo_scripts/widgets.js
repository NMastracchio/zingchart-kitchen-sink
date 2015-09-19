zingchart.widgets.dashboard_container={parse:function(e){var t=e.x||0,n=e.y||0,r=e.width||240,i=e.height||240,s=e.id||"dash",o=e.backgroundColor1||"#232526",u=e.backgroundColor2||"#202122",a={labels:[],shapes:[{type:"poly",zIndex:-1e3,points:[[t,n],[t+r+1,n],[t,n+i+1]],backgroundColor:o,flat:!0},{type:"poly",zIndex:-1e3,points:[[t+r,n+i],[t+r,n],[t,n+i]],backgroundColor:o+" "+u,fillAngle:180,fillOffsetX:r/4,flat:!0}]};return a}},zingchart.widgets.dashboard_datetime={tinfo:function(){var e=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n=new Date,r=n.getHours(),i=n.getMinutes(),s="AM";return r>12&&(r-=12,s="PM"),r=r<10?"0"+r:r,i=i<10?"0"+i:i,{dow:e[n.getDay()],day:n.getDate()+" "+t[n.getMonth()]+" "+n.getFullYear(),time:r+":"+i+'<span style="font-size:39px">'+s+"</span>"}},update:function(e,t,n){var r=zingchart.widgets.dashboard_datetime.tinfo();zingchart.exec(e,"updateobject",{data:[{type:"label",id:t+"_time_sh",text:r.time},{type:"label",id:t+"_time",text:r.time}]})},parse:function(e){var t=e.x||0,n=e.y||0,r=e.width||240,i=e.height||240,s=e.id||"dash",o=e.title||"",u=e.value||"",a=e.percent||0,f=zingchart.widgets.dashboard_container.parse(e);window.setInterval(function(){zingchart.widgets.dashboard_datetime.update(e.loader.id,s,{time:Math.random()})},5e3);var l=zingchart.widgets.dashboard_datetime.tinfo();return f.labels.push({text:o,color:"#eee",fontSize:13,bold:!0,x:t,y:n,width:r,textAlign:"left",padding:"8 8 8 28",flat:!0},{text:l.time,id:s+"_time_sh",color:"#000",fontSize:57,x:t+2,y:n+34,width:r,height:90,textAlign:"left",padding:"8 8 8 8",flat:!0,backgroundImage:"PATTERN_NARROW_HORIZONTAL",vmlBackgroundImage:""},{text:l.time,id:s+"_time",zIndex:1e3,color:"#eee",fontSize:57,x:t,y:n+32,width:r,height:90,textAlign:"left",padding:"8 8 8 8",flat:!0},{text:l.dow,color:"#eee",fontSize:27,x:t+2,y:n+130,width:r,textAlign:"left",padding:"8 8 8 8",flat:!0},{text:l.day,color:"#eee",fontSize:27,x:t+2,y:n+164,width:r,textAlign:"left",padding:"8 8 8 8",flat:!0}),f.shapes.push({type:"line",points:[[t,n+33],[t+r,n+33]],lineWidth:1,lineColor:"#121314",flat:!0},{type:"line",points:[[t,n+34],[t+r,n+34]],lineWidth:1,lineColor:"#303334",flat:!0},{type:"line",points:[[t,n+126],[t+r,n+126]],lineWidth:1,lineColor:"#121314",flat:!0},{type:"line",points:[[t,n+127],[t+r,n+127]],lineWidth:1,lineColor:"#303334",flat:!0}),f}},zingchart.widgets.dashboard_metric={percent:function(e){var t=String(Math.abs(e)).split("."),n=t[0]||"0",r=t[1]||"00";return n+'<span style="font-size:39px">.'+r+"%</span>"},update:function(e,t,n){var r=parseFloat(Number(1e3*Math.random()).toFixed(2)),i=parseFloat(Number(-10+20*Math.random()).toFixed(2));zingchart.exec(e,"updateobject",{data:[{objtype:"label",id:t+"_value_sh",text:r},{objtype:"label",id:t+"_value",text:r},{objtype:"label",id:t+"_percent",color:i>0?"#77AB13":"#AE432E",text:zingchart.widgets.dashboard_metric.percent(i)},{objtype:"shape",id:t+"_trend",angle:i>0?0:180,backgroundColor:i>0?"#77AB13":"#AE432E"}]})},parse:function(e){var t=e.x||0,n=e.y||0,r=e.width||240,i=e.height||240,s=e.id||"dash",o=e.title||"",u=e.value||"",a=e.percent||0,f=zingchart.widgets.dashboard_container.parse(e);return window.setInterval(function(){zingchart.widgets.dashboard_metric.update(e.loader.id,s,{})},2e3+parseInt(2e3*Math.random(),10)),f.labels.push({text:o,color:"#eee",fontSize:13,bold:!0,x:t,y:n,width:r,textAlign:"left",padding:"8 8 8 28",flat:!0},{text:u,id:s+"_value_sh",color:"#000",fontSize:57,x:t+12,y:n+42,flat:!0},{text:u,id:s+"_value",color:"#eee",fontSize:57,x:t+10,y:n+40,flat:!0},{text:zingchart.widgets.dashboard_metric.percent(a),id:s+"_percent",color:a>0?"#77AB13":"#AE432E",fontSize:47,x:t+50,y:n+105,flat:!0}),f.shapes.push({type:"line",points:[[t,n+33],[t+r,n+33]],lineWidth:1,lineColor:"#121314",flat:!0},{type:"line",points:[[t,n+34],[t+r,n+34]],lineWidth:1,lineColor:"#303334",flat:!0},{type:"circle",x:t+16,y:n+16,size:6,fillAngle:45,fillOffsetX:4,fillOffsetY:4,backgroundColor:"#556D2C #384820",flat:!0},{type:"triangle",id:s+"_trend",shadow:!0,shadowDistance:2,shadowColor:"#000",x:t+30,y:n+140,size:16,angle:a>0?0:180,backgroundColor:a>0?"#77AB13":"#AE432E",flat:!0}),f}},zingchart.widgets.dashboard_accounts={update:function(e,t,n){zingchart.exec(e,"setseriesvalues",{graphid:t+"_graph",values:[[10+parseInt(100*Math.random(),10)],[10+parseInt(100*Math.random(),10)],[10+parseInt(100*Math.random(),10)]],smart:!0})},parse:function(e){var t=e.x||0,n=e.y||0,r=e.width||240,i=e.height||240,s=e.id||"dash",o=zingchart.widgets.dashboard_container.parse(e);return window.setInterval(function(){zingchart.widgets.dashboard_accounts.update(e.loader.id,s,{})},5e3),o.graphs=o.graphs||[],o.graphs.push({id:s+"_graph",backgroundColor:"none",type:"pie",x:t,y:n,width:r,height:i,scale:{sizeFactor:.65},plotarea:{margin:"10 10 40 10"},title:{text:"Accounts",backgroundColor:"none",color:"#fff"},legend:{shadow:!1,borderWidth:0,backgroundColor:"none",margin:"auto auto 10 auto",layout:"float",item:{margin:2,padding:2,color:"#fff"},marker:{type:"default",width:15,height:10,borderRadius:3,borderWidth:0}},plot:{_animation:{speed:500,method:0,effect:3},shadow:!1,valueBox:{visible:!1},slice:20},series:[{values:[103],text:"Free",backgroundColor:"#058DC7"},{values:[37],text:"Basic",backgroundColor:"#50B432"},{values:[192],text:"Premium",backgroundColor:"#EF561A"}]}),o}};