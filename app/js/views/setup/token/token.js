define([
	'text!views/setup/token/token.html',
	'views/baseview'
], function (html, View) {
    var model = kendo.observable({
        onInit: function(e){
            
        },
        onAfterShow: function(e){
            
        },
        gotoHome: function(){
            App.mobile.navigate("#view-pin");
        }
    });
    new View('token', html, model);
    return model;
});