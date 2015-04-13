define([
	'text!./more.html'
], function (html) {
    var model = mrapp.view({
        html: html,
        name: "more",
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