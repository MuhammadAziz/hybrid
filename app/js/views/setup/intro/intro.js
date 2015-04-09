define([
	'text!views/setup/intro/intro.html'
], function (html) {
    var model = mrapp.view({
        html: html,
        name: "intro",
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