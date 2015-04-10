define(['mrapp'], function(mrapp){
	var DataSource = kendo.data.DataSource.extend({
		init: function(element, options){
			var that = this;
			kendo.data.DataSource.fn.init.call(that, element, options);
			
			document.addEventListener("online", function(){
//				that.online(true);
			}, false);
			
			document.addEventListener("offline", function(){
//				that.online(true);
			}, false);
		}
	});
	mrapp.data = function(options){
		return new DataSource(options);
	};
});