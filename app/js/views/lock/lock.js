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
				mrapp.mobile.navigate("#view-home");
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
		}
    });
    return model;
});