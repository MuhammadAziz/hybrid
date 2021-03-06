define([
	'text!./password.html',
    'utils/settings',
], function (html, settings) {
    var notif = navigator.notification,
    model = mrapp.view({
        html: html,
        name: "password",
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
        formData:{
            password: null,
            confirmPassword: null
        },
        next: function(){
            module.validate();
        }
    }),
    
    //Always use private object for sensitive operation 
    module = {
        validate: function(){
            var password = model.formData.password, 
                confirmPassword = model.formData.confirmPassword;
            if(password && password === confirmPassword){
                module.success(password);
            }else{
                notif.alert("Password doesn't match", module.error, "Password", "Ok");
            }
        },
        success: function(value){
            mrapp.mobile.navigate("#view-login-info");
            model.resetForm.call(model, "formData");
        },
        error: function(){
            model.resetForm.call(model, "formData.confirmPassword");
        }
    };
    return model.newInstance;
});