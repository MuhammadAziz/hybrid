define(function () {
    // Main app test
    var mrapp = window.mrapp = window.mrapp || {model: {}};

    var View = kendo.Class.extend({
        init: function (name, template, model) {

            // append the template to the DOM
            this.html = $(template).appendTo(document.body);
            // expose the model and events off the global scope
            // mrapp[name] = { model: model || {}, events: events || {} };
            mrapp.model[name] = model;
        }
    });
    return View;
});