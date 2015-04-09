define([
	'text!views/home/home.html',
	'utils/settings',
	'utils/passcode-helper'
], function (html, settings, passcode) {
	var $home = null;
	var model = mrapp.view({
                html: html,
                name: "home",
		onInit: function (e) {
			$home = e.sender.element;
		},
		onBeforeShow: function (e) {
			if (mrapp.mobile) {
				if (settings.isFirstLaunch()) {
					e.preventDefault();
					mrapp.mobile.pane.history.pop();
					mrapp.mobile.navigate("#view-intro");
//				} else if (settings.isLoggedIn() === false) {
//					e.preventDefault();
//					mrapp.mobile.pane.history.pop();
//					mrapp.mobile.navigate("#view-login");
				} else if (passcode.isInvalidPasscode()) {
					e.preventDefault();
					mrapp.mobile.pane.history.pop();
					mrapp.mobile.navigate("#view-lock");
				}
			}
		},
		onAfterShow: function (e) {

		},
		reset: function (e) {
			settings.setDefault();
			passcode.reset();
			mrapp.mobile.pane.history.pop();
			this.onBeforeShow(e);
		}
	});
	return model;
});