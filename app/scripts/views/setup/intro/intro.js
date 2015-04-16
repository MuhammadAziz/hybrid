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
        start: function(e){
            mrapp.mobile.navigate("#view-token");
        },
        returningUser: function(){
            this.toast("Not available yet");
        },
        help: function(){
            this.toast("Not available yet");
        }
    });
    return model.newInstance;
});