define([
	'utils/listeners',
    'views/setup/intro/intro',
    'views/setup/token/token',
    'views/setup/pin/pin',
    'views/lock/lock',
    'views/home/home'
], function (listeners) {
    // create a global container object
    var App = window.App = window.App || {};

    App.init = function () {
        // intialize the application
        App.mobile = new kendo.mobile.Application(document.body, {skin: 'flat', transition: "slide", browserHistory: false});
		App.mobile.navigate("#view-home");
		listeners.run();
    };

    return App;

});