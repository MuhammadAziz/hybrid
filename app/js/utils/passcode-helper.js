define([
	"utils/base-utils",
	"utils/settings"],
		function (BaseUtils, settings) {
			var PHRASE = "SGVsbG8sIFdvnVBJbHJuigUIGUFT==cmxkIQ==";
			var passcodeConst = {
				KEY: "stored_passcode_key",
				COOKIE_KEY: "cookie_passcode_key",
				EXPIRED_IN_MINUTE: 1,
				FLAG: "success_login"
			};
			var privateValue = {
				getCurrentPasscode: function (guid) {
					var value = settings.getFromStorage(passcodeConst.KEY);
					if (guid) {
						value = settings.decrypt(guid, value);
					}
					return value;
				}
			};

			var utils = BaseUtils.extend({
				savePasscode: function (value, guid) {
					guid = guid || PHRASE; //TODO: change pass phrase to patient guid
					var encypted = this.encrpyt(guid, value);
					this.saveToStorage(passcodeConst.KEY, encypted);
					this.updatePasscodeCookie();
				},
				validate: function (passcode, guid) {
					guid = guid || PHRASE; //TODO: change pass phrase to patient guid
					var current = privateValue.getCurrentPasscode(guid);
					return  passcode === current; //convert to string
				},
				updatePasscodeCookie: function () {
					if (this.isPasscodeDisabled()) {
						return;
					} else {
						var date = new Date();
						date.setTime(date.getTime() + (passcodeConst.EXPIRED_IN_MINUTE * 60 * 1000));
						var expired = date;
						$.cookie(passcodeConst.COOKIE_KEY, null);
						$.cookie(passcodeConst.COOKIE_KEY, passcodeConst.FLAG, {expires: expired});
					}
				},
				changePasscode: function () {
					//TODO: oprn setup/pin
				},
				togglePasscode: function (value) {
					if (value === false) {
						this.deleteFromStorage(passcodeConst.KEY);
					}
					settings.togglePasscode(value);
				},
				isInvalidPasscode: function () {
					var cookie = $.cookie(passcodeConst.COOKIE_KEY);
					return !cookie;
				},
				isPasscodeEnabled: function () {
					return settings.isPasscode() && this.isExist();
				},
				isPasscodeDisabled: function () {
					return settings.isPasscode() === false && this.isExist() === false;
				},
				isExist: function () {
					var code = privateValue.getCurrentPasscode();
					return !!code;
				},
				reset: function () {
					this.deleteFromStorage(passcodeConst.KEY);
					$.removeCookie(passcodeConst.COOKIE_KEY);
				}
			});
			return new utils();
		});

