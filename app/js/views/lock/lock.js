define([
	'text!views/lock/lock.html',
	'utils/passcode-helper'
], function (html, passcode) {
    var notif = navigator.notification;
    var model = mrapp.view({
        html: html,
        name: "lock",
        onInit: function(e){
            
        },
		onBeforeShow: function(){
			this.model.reset();
		},
        onAfterShow: function(e){
			
        },
		onShow: function(e){
			
		},
		formData:{
			passCode: null
		},
        unlock: function(){
            if(this.validate()){
				passcode.updatePasscodeCookie();
				mrapp.mobile.navigate("#view-profile");
			}else{
				notif.alert("Please enter correct pin", null, "Invalid PIN", "Ok");
			}
        },
		validate: function(){
			if(this.formData.passCode){
				return passcode.validate(this.formData.passCode);
			}else{
				return false;
			}
		},
		reset: function(){
			this.set("formData", {
				passCode: null
			});
		}
    });
    return model;
});