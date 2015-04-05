define([
	'text!views/intro/intro.html',
	'views/baseview'
], function (html, View) {
    debugger;
    var model = kendo.observable({
        click: function(){
            alert("test");
        }
    });
    var events = {
        onInit: function(e){
            
        },
        onAfterShow: function(e){
            
        }
    };
    new View('intro', html, model, events);
    return model;
});