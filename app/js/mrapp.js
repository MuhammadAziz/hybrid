define([
    'utils/listeners',
    'views/setup/intro/intro',
    'views/setup/token/token',
    'views/setup/pin/pin',
    'views/setup/agreement/agreement',
    'views/lock/lock',
    'views/home/home'
], function (listeners) {
    // create a global container object
    var mrapp = window.mrapp = window.mrapp || {};

    mrapp.init = function () {
        // intialize the application
        mrapp.mobile = new kendo.mobile.Application(document.body, {skin: 'flat', transition: "slide", browserHistory: false});
		mrapp.mobile.navigate("#view-home");
		listeners.run();
    };

    return mrapp;

});