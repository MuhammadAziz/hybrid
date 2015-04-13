define([
	'text!./login-info.html',
    'utils/settings',
], function (html, settings) {
    var model = mrapp.view({
        html: html,
        name: "loginInfo",
        onBeforeShow: function(e){
            if(settings.isSetupComplete()){
                e.preventDefault();
            }else{
                e.isSetup = true;
            }
        },
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