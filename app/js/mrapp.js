define([
    'utils/listeners',
    'views/setup/intro/intro',
    'views/setup/token/token',
    'views/setup/pin/pin',
    'views/setup/agreement/agreement',
    'views/lock/lock',
    'views/home/home',
    'views/favorite/favorite',
    'views/more/more',
    'views/profile/profile'
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