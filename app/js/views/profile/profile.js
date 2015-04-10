define([
	'text!views/profile/profile.html',
	'utils/settings',
	'utils/passcode-helper'
], function (html, settings, passcode) {
	var $profile = null;
	var model = mrapp.view({
                html: html,
                name: "profile",
		onInit: function (e) {
			$profile = e.sender.element;
		},
		onBeforeShow: function (e) {
			if (mrapp.mobile) {
				if (settings.isFirstLaunch()) {
					e.preventDefault();
					navigator.app.clearHistory();
					mrapp.mobile.navigate("#view-intro");
//				} else if (settings.isLoggedIn() === false) {
//					e.preventDefault();
//					navigator.app.clearHistory();
//					mrapp.mobile.navigate("#view-login");
				} else if (passcode.isInvalidPasscode()) {
					e.preventDefault();
					navigator.app.clearHistory();
					mrapp.mobile.navigate("#view-lock");
				}
			}
		},
		onAfterShow: function (e) {
			debugger;
			navigator.app.clearHistory();
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