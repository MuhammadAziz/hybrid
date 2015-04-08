define([
	'text!views/home/home.html',
	'views/baseview',
	'utils/settings',
	'utils/passcode-helper'
], function (html, View, settings, passcode) {
	var $home = null;
	var model = kendo.observable({
		onInit: function (e) {
			$home = e.sender.element;
		},
		onBeforeShow: function (e) {
			if (App.mobile) {
				if (settings.isFirstLaunch()) {
					e.preventDefault();
					App.mobile.pane.history.pop();
					App.mobile.navigate("#view-intro");
//				} else if (settings.isLoggedIn() === false) {
//					e.preventDefault();
//					App.mobile.pane.history.pop();
//					App.mobile.navigate("#view-login");
				} else if (passcode.isInvalidPasscode()) {
					e.preventDefault();
					App.mobile.pane.history.pop();
					App.mobile.navigate("#view-lock");
				}
			}
		},
		onAfterShow: function (e) {

		},
		reset: function (e) {
			settings.setDefault();
			passcode.reset();
			App.mobile.pane.history.pop();
			this.onBeforeShow(e);
		}
	});
	new View('home', html, model);
	return model;
});