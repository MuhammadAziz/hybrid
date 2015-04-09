// configure the path to the text plugin since it is not in the same directory
// as require.js
require.config({
    paths: {
        'text': '../bower_components/requirejs-text/text'
    }
});

define(['app', 'views/base-view-model'], function (app) {
    // if we are running on device, listen for cordova deviceready event
    if (kendo.mobileOs) {
        document.addEventListener('deviceready', function () {
            // initialize application
            app.init();

            // hide the native spash screen
            navigator.splashscreen.hide();
        }, false);
    }
    else {
        // we are running on the web (prolly debug) so just show the app
        app.init();
    }

});