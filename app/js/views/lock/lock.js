define([
	'text!views/lock/lock.html',
	'views/baseview',
	'utils/passcode-helper'
], function (html, View, passcode) {
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
				alert("please enter correct passcode");
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