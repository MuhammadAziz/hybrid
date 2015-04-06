define([
	'text!views/home/home.html',
	'views/baseview'
], function (html, View) {
    var model = kendo.observable({
        onInit: function(e){
            
        },
        onAfterShow: function(e){
//			window.App.mobile.navigate("#view-lock");
        },
        click: function(){
            alert("test");
        }
    });
    new View('home', html, model);
    return model;
});