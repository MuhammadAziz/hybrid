define([
	'text!views/setup/agreement/agreement.html',
	'views/baseview',
	'utils/settings'
], function (html, View, settings) {
    var model = kendo.observable({
        onInit: function(e){
            
        },
        onAfterShow: function(e){
            
        },
		onBeforeHide: function(){
			
		},
        next: function(){
			settings.disableFirstLaunch();
            App.mobile.navigate("#view-home");
        },
		back: function(){
			
		}
    });
    new View('agreement', html, model);
    return model;
});