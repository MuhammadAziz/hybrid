define(function () {
    // Main app test
    var App = window.App = window.App || {model: {}};

    var View = kendo.Class.extend({
        init: function (name, template, model) {

            // append the template to the DOM
            this.html = $(template).appendTo(document.body);
            // expose the model and events off the global scope
            // App[name] = { model: model || {}, events: events || {} };
            App.model[name] = model;
        }
    });
    return View;
});