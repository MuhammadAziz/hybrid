define([
	'utils/utils',
    'views/home/home',
    'views/setup/intro/intro',
    'views/setup/token/token',
    'views/setup/pin/pin',
    'views/lock/lock'
], function (utils) {
    // create a global container object
    var App = window.App = window.App || {};

    App.init = function () {
        // intialize the application
        App.mobile = new kendo.mobile.Application(document.body, {skin: 'flat', initial: "#view-intro", transition: "slide", browserHistory: false});
		document.addEventListener("pause", function(e){
			if(!utils.isSkipPasscode){
				utils.updatePasscodeCookie();
			}
		});
    };

    return App;

});