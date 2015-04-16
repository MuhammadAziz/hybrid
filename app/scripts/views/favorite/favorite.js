define([
	'text!./favorite.html'
], function (html) {
    var model = mrapp.view({
        html: html,
        name: "favorite",
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