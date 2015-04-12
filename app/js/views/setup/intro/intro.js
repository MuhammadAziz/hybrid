define([
	'text!views/setup/intro/intro.html'
], function (html) {
    var context,
    model = mrapp.view({
        html: html,
        name: "intro",
		firstShow: true,
		onBeforeShow: function(e){
			context = this.model;
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