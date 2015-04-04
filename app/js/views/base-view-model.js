define(function(){
	var App = window.App = window.App || {model: {}, events: {}};
	var base = kendo.data.ObservableObject.extend({
		init: function(){
			kendo.data.ObservableObject.init.call(this, arguments);
		},
		events: {
			onInit: function(){
				
			},
			onAfterShow: function(){
				
			}
		}
	});
	return base;
});

