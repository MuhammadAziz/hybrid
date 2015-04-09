define([
	'text!views/setup/token/token.html',
], function (html) {
    var model = mrapp.view({
        html: html,
        name: "token",
        onInit: function(e){
            
        },
        onAfterShow: function(e){
            
        },
		formData:{
			token: null
		},
        next: function(){
            mrapp.mobile.navigate("#view-pin");
        }
    });
    return model;
});