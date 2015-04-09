define([
	'text!views/setup/agreement/agreement.html',
	'views/baseview',
	'utils/settings',
	'utils/passcode-helper'
], function (html, View, settings, passcode) {
    var model = kendo.observable({
        onInit: function(e){
            
        },
        onAfterShow: function(e){
            
        },
		onBeforeHide: function(){
			
		},
        next: function(){
			passcode.updatePasscodeCookie();
			settings.disableFirstLaunch();
            App.mobile.navigate("#view-home");
        },
		back: function(){
			
		}
    });
    new View('agreement', html, model);
    return model;
});