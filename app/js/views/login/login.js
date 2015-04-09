define([
	'text!views/setup/login/login.html',
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
    new View('login', html, model);
    return model;
});