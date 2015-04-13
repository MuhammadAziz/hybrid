define([
	'text!./agreement.html',
	'utils/settings',
	'utils/passcode-helper'
], function (html, settings, passcode) {
    var model = mrapp.view({
        html: html,
        name: "agreement",
		onBeforeShow: function(e){
			
		},
        onInit: function(e){
            
        },
        onAfterShow: function(e){
            
        },
		onBeforeHide: function(){
			
		},
        next: function(){
			passcode.updatePasscodeCookie();
			settings.disableFirstLaunch();
            mrapp.mobile.navigate("#view-profile");
        },
		back: function(){
			mrapp.mobile.navigate("#view-intro");
		}
    });
    return model;
});