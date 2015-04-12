define([
	'text!views/setup/personal-info/personal-info.html'
], function (html) {
    var model = mrapp.view({
        html: html,
        name: "personalInfo",
        onInit: function(e){
            
        },
        onAfterShow: function(e){
            
        },
        next: function(){
            mrapp.mobile.navigate("#view-password");
        },
        back: function(){
            mrapp.mobile.navigate("#:back");
        }
    });
    return model;
});