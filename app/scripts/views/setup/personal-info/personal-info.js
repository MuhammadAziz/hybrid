define([
	'text!./personal-info.html',
    'utils/settings',
], function (html, settings) {
    var model = mrapp.view({
        html: html,
        name: "personalInfo",
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
        next: function(){
            mrapp.mobile.navigate("#view-password");
        },
        back: function(){
            mrapp.mobile.navigate("#:back");
        }
    });
    return model.newInstance;
});