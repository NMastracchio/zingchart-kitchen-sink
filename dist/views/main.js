define(["require","exports","module","backbone"],function(e,t,n){var r=e("backbone"),i=r.View.extend({el:"#zc-kitchen-sink",template:_.template($("#SinkTemplate").html()),initialize:function(){this.render()},events:{"click li":"changeRoute","change #theme-picker":"changeTheme"},render:function(){return this.$el.html(this.template()),this},changeRoute:function(e){$("#loading-shutter").animate({top:"+=1080"},500,function(){var t=$(e.target).data("route");router.navigate(t,{trigger:!0})})},changeTheme:function(e){var t=function(e,t){var n=e.get("render"),r=_.clone(n.get("data"));zingchart.exec(n.attributes.id,"destroy"),r.theme=t,n.set("data",r)},n=$(e.target).val(),r=router.currentView.coll;router.currentView.destroyCharts();switch(n){case"light":r.each(function(e){t(e,"light")}),router.currentView.render();break;case"dark":r.each(function(e){t(e,"dark")}),router.currentView.render();break;case"windows-xp":r.each(function(e){t(e,"default")}),router.currentView.render()}}});n.exports=i});