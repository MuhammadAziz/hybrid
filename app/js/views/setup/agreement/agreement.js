define([
	'text!views/setup/agreement/agreement.html',
	'utils/settings',
	'utils/passcode-helper'
], function (html, settings, passcode) {
    var model = mrapp.view({
        html: html,
        name: "agreement",
        onInit: function(e){
            
        },
        onAfterShow: function(e){
            
        },
		onBeforeHide: function(){
			
		},
        next: function(){
			passcode.updatePasscodeCookie();
			settings.disableFirstLaunch();
            mrapp.mobile.navigate("#view-home");
        },
		back: function(){
			
		}
    });
    return model;
});