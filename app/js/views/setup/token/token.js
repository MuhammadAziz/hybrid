define([
    'text!views/setup/token/token.html'
], function (html) {
    var notif = navigator.notification, DUMMY_VALID_TOKEN = 'token',
    model = mrapp.view({
        html: html,
        name: "token",
        onInit: function (e) {
            
        },
        onAfterShow: function (e) {

        },
        formData: {
            token: null
        },
        next: function (e) {
            e.preventDefault();
            module.validate();
        }
    }),
    
    //Always use private object for sensitive operation 
    module = {
        validate: function () {
            if (model.formData.token) {
                module.submit(model.formData.token);
            } else {
                notif.alert("Please enter your valid token", module.error, "Invalid Token", "Ok");
            }
        },
        error: function (e) {
            model.resetForm.call(model, "formData");
        },
        success: function (data) {
            model.resetForm.call(model, "formData");
            mrapp.mobile.navigate("#view-personal-info");
        },
        submit: function(value){
            //TODO: add submit procedure
            if(value === DUMMY_VALID_TOKEN){
                module.success(value);
            }else{
                notif.alert("Sorry, your token is invalid", module.error, "Invalid Token", "Ok");
            }
        }
    };
    return model;
});