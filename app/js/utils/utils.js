define(function () {
	var uiConst = {
		passcode: {
			KEY: "passcode_key",
			COOKIE_KEY: "cookie_passcode_key",
			EXPIRED_IN_MINUTE: 5
		}
	};
	var BaseUtils = kendo.Class.extend({
		saveToStorage: function (key, value) {
			localStorage.setItem(key, value);
		},
		getFromStorage: function (key) {
			return localStorage.getItem(key);
		}
	});

	var utils = BaseUtils.extend({
		_skipPasscode: false,
		savePasscode: function (value) {
			this.saveToStorage(uiConst.passcode.KEY, value);
		},
		getPasscode: function () {
			return this.getFromStorage(uiConst.passcode.KEY);
		},
		getPasscodeCookie: function () {
			return $.cookie(uiConst.passcode.COOKIE_KEY);
		},
		updatePasscodeCookie: function () {
			var date = new Date();
			date.setTime(date.getTime() + (uiConst.passcode.EXPIRED_IN_MINUTE * 60 * 1000));
			var expired = date;
			$.cookie(uiConst.passcode.COOKIE_KEY, this.getPasscode(), { expires: expired});
		},
		changePasscode: function () {

		},
		isSkipPasscode: function(){
			return this._skipPasscode;
		},
		skipPasscode:function(skip){
			this._skipPasscode = skip;
		},
		isFirstLaunch: function(){
			return false;
		},
		isLoggedOut: function(){
			return false;
		},
		isInvalidPasscode: function(){
			return true;
		}
	});
	return new utils();
});

