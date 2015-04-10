define([
	'text!views/setup/intro/intro.html'
], function (html) {
    var model = mrapp.view({
        html: html,
        name: "intro",
		firstShow: true,
		onBeforeShow: function(e){
			
		},
		onHide: function(){
			
		},
        onInit: function(e){
            
        },
        onAfterShow: function(e){
            
        },
        next: function(){
            alert("test");
        }
    });
    return model;
});