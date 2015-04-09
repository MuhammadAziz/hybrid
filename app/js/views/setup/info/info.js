define([
	'text!views/setup/info/info.html'
], function (html) {
    var model = mrapp.view({
        html: html,
        name: "info",
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