define([
	'text!views/lock/lock.html',
	'views/baseview',
	'utils/passcode-helper'
], function (html, View, passcode) {
    var notif = navigator.notification;
    var model = kendo.observable({
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
				App.mobile.navigate("#view-home");
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
    new View('lock', html, model);
    return model;
});