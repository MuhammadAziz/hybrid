define([
	'text!views/setup/pin/pin.html',
	'views/baseview',
	'utils/utils'
], function (html, View, utils) {
	var $views = null, isSaved = false;
	var model = kendo.observable({
		onInit: function (e) {
			$views = e.sender.element.find('input[type="password"]');
		},
		onShow: function (e) {
		},
		onAfterShow: function () {
			$views[0].focus();
			if (isSaved) {
				App.mobile.navigate("#view-home");
			}
		},
		formData: {
			passCode1: null,
			passCode2: null,
			passCode3: null,
			passCode4: null
		},
		dataChanged: function () {
			var data = this.formData, that = this, passCode = [];
			if (data.passCode1 && data.passCode2 && data.passCode3 && data.passCode4) {
				passCode.push(data.passCode1);
				passCode.push(data.passCode2);
				passCode.push(data.passCode3);
				passCode.push(data.passCode4);
				that._save(passCode.join(''));
			}
		},
		_save: function (data) {
			utils.savePasscode(data);
			App.mobile.navigate("#view-home");
			isSaved = true;
		},
		skip: function () {
			utils.skipPasscode(true);
			App.mobile.navigate("#view-home");
			isSaved = true;
		}
	});
	new View('pin', html, model);
	return model;
});