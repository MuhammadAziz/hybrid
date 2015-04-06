define([
	'text!views/lock/lock.html',
	'views/baseview'
], function (html, View) {
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
				App.mobile.navigate("#view-home");
			}else{
				alert("please enter correct passcode");
			}
        },
		validate: function(){
			var code = this.formData.passCode;
			var cookie = $.cookie('passcode');
			if(code){
				if(cookie === code){
					return true;
				}
			}
			return false;
		}
    });
    new View('lock', html, model);
    return model;
});