define([
	'text!views/home/home.html',
	'views/baseview',
	'utils/utils'
], function (html, View, utils) {
	var model = kendo.observable({
		onInit: function (e) {

		},
		onBeforeShow: function (e) {
			if (App.mobile) {
				if (utils.isFirstLaunch()) {
					e.preventDefault();
					App.mobile.pane.history.pop();
					App.mobile.navigate("#view-intro");
				} else if (utils.isLoggedOut()) {
					e.preventDefault();
					App.mobile.pane.history.pop();
					App.mobile.navigate("#view-login");
				} else if (utils.isInvalidPasscode()) {
					e.preventDefault();
					App.mobile.pane.history.pop();
					App.mobile.navigate("#view-lock");
				}
			}
		},
		onAfterShow: function (e) {
		},
		click: function () {
			alert("test");
		}
	});
	new View('home', html, model);
	return model;
});