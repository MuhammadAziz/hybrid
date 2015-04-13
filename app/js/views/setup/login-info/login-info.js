define([
	'text!./login-info.html'
], function (html) {
    var model = mrapp.view({
        html: html,
        name: "loginInfo",
        onInit: function(e){
            
        },
        onAfterShow: function(e){
            
        },
        back: function(){
            mrapp.mobile.navigate("#:back");
        },
        next: function(){
            mrapp.mobile.navigate("#view-pin");
        }
    });
    return model;
});