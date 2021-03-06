define([
    'utils/listeners',
    'setup/intro/intro',
    'setup/token/token',
    'setup/personal-info/personal-info',
    'setup/password/password',
    'setup/login-info/login-info',
    'setup/pin/pin',
    'setup/agreement/agreement',
    'views/lock/lock',
    'views/home/home',
    'views/favorite/favorite',
    'views/more/more',
    'views/profile/profile',
    'views/demo/demo'
], function (listeners) {
    // create a global container object
    var mrapp = window.mrapp = window.mrapp || {};
    var fixViewResize = function () {
        if (device.platform === 'iOS') {
            setTimeout(function() {
                $(document.body).height(window.innerHeight);
            }, 10);
        }
    };
    var os = kendo.support.mobileOS,
        statusBarStyle = os.ios && os.flatVersion >= 700 ? 'black-translucent' : 'black';

    var errorHandler = function (e) {
        e.preventDefault();
        var message = e.message + "' from " + e.filename + ":" + e.lineno;

        navigator.notification.alert(message, function () {
        }, title, 'OK');

        return true;
    };

    mrapp.init = function () {
        fixViewResize();
        // intialize the application
        mrapp.mobile = new kendo.mobile.Application(document.body, {
                                                     transition: 'slide',
                                                     statusBarStyle: statusBarStyle,
                                                     skin: 'flat',
                                                     browserHistory: false
                                                 });
		mrapp.mobile.navigate("#view-profile");
		listeners.run({
            fixViewResize: fixViewResize,
            errorHandler: errorHandler
        });
    };

    return mrapp;

});