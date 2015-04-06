define([
	'text!views/setup/password/password.html',
	'views/baseview'
], function (html, View) {
    var model = kendo.observable({
        onInit: function(e){
            
        },
        onAfterShow: function(e){
            
        },
        click: function(){
            alert("test");
        }
    });
    new View('password', html, model);
    return model;
});