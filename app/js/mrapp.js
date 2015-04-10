define([
    'utils/listeners',
    'setup/intro/intro',
    'setup/token/token',
    'setup/pin/pin',
    'setup/agreement/agreement',
    'views/lock/lock',
    'views/home/home',
    'views/favorite/favorite',
    'views/more/more',
    'views/profile/profile',
    'views/demo/demo',
    'views/demo/details/barcode/barcode',
    'views/demo/details/calendar/calendar'
], function (listeners) {
    // create a global container object
    var mrapp = window.mrapp = window.mrapp || {};

    mrapp.init = function () {
        // intialize the application
        mrapp.mobile = new kendo.mobile.Application(document.body, {skin: 'flat', transition: "slide", browserHistory: false});
		mrapp.mobile.navigate("#view-profile");
		listeners.run();
    };

    return mrapp;

});