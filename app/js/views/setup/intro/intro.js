define([
	'text!./intro.html'
], function (html) {
    var model = mrapp.view({
        html: html,
        name: "intro",
		firstShow: true,
		onBeforeShow: function(e){
            e.isSetup = true;
		},
		onHide: function(){
			
		},
        onInit: function(e){
            
        },
        onAfterShow: function(e){
            
        },
        next: function(e){
            mrapp.mobile.navigate("#view-token");
        }
    });
    return model;
});