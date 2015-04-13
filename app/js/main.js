// configure the path to the text plugin since it is not in the same directory
// as require.js
require.config({
    baseUrl: 'js',
    paths: {
        'text': '../bower_components/requirejs-text/text',
        'data': 'data',
        'views': 'views',
        'utils': 'utils',
        'layout': 'layout',
        'base': 'base',
        'setup': 'views/setup'
    }
});

define([
    'base/base-view-model',
    'base/base-data-source',
    'mrapp'
], function() {
    // if we are running on device, listen for cordova deviceready event
    if (kendo.mobileOs) {
        document.addEventListener('deviceready', function() {
            // initialize mrapplication
            mrapp.init();

            // hide the native spash screen
            navigator.splashscreen.hide();
        }, false);
    } else {
        // we are running on the web (prolly debug) so just show the mrapp
        mrapp.init();
    }
});
