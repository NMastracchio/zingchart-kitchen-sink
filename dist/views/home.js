define(["require","exports","module","backbone","../models/info","../main","../main"],function(e,t,n){var r=e("backbone"),i=e("../models/info"),s=r.View.extend({el:"#zc-kitchen-sink",template:_.template($("#SinkTemplate").html()),initialize:function(){this.model=new i,console.log(this.model),this.render()},events:{"click li":"changeRoute","change #theme-picker":"changeTheme"},render:function(){return this.$el.html(this.template()),this},changeRoute:function(t){$("#loading-shutter").animate({top:"+=1080"},500,function(){var n=e("../main"),r=$(t.target).data("route");n.navigate(r,{trigger:!0})})},changeTheme:function(t){var n=e("../main"),r=function(e,t){var n=e.get("render"),r=_.clone(n.get("data"));zingchart.exec(n.attributes.id,"destroy"),r.theme=t,n.set("data",r)},i=$(t.target).val(),s=n.currentView.coll;this.model.set("theme",i),console.log(this.model),n.currentView.destroyCharts();switch(i){case"zingchart":s.each(function(e){r(e,"zingchart")}),n.currentView.render();break;case"dark":s.each(function(e){r(e,"dark")}),n.currentView.render();break;case"windows-xp":s.each(function(e){r(e,"classic")}),n.currentView.render()}}});n.exports=s});