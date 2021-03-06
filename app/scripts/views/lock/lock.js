define([
	'text!./lock.html',
	'utils/passcode-helper'
], function (html, passcode) {
    var notif = navigator.notification;
    var model = mrapp.view({
        html: html,
        name: "lock",
        onInit: function(e){
            
        },
        onAfterShow: function(e){
			model.clearHistory();
        },
		onShow: function(e){
			
		},
		formData:{
			passCode: null
		},
        unlock: function(){
            if(this.validate()){
				model.clearHistory();
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
			model.resetForm("formData");
		}
    });
    return model.newInstance;
});