define([
	'text!./login.html'
], function (html) {
    var model = mrapp.view({
        html: html,
        name: "login",
        onInit: function(e){
            
        },
        onAfterShow: function(e){
            
        },
        click: function(){
            alert("test");
        }
    });
    return model.newInstance;
});