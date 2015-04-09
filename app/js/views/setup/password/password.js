define([
	'text!views/setup/password/password.html'
], function (html) {
    var model = mrapp.view({
        html: html,
        name: "password",
        onInit: function(e){
            
        },
        onAfterShow: function(e){
            
        },
        click: function(){
            alert("test");
        }
    });
    return model;
});