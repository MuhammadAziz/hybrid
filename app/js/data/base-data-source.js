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
<<<<<<< HEAD
});
=======
});
>>>>>>> 5edae083c8b8818ce8b9749bfc08bb2640227276
