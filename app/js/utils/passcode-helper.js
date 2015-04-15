define([
	"utils/base-utils",
	"utils/settings"],
		function (BaseUtils, settings) {
			var PHRASE = "SGVsbG8sIUIGUFT==cmxkIQ==";
			var passcodeConst = {
				KEY: "settings:passcode",
				TIMESTAMP_KEY: "data:d", //minimize name to speed up encryption
				EXPIRED_IN_MINUTE: 1
			};
			var privateValue = {
				getCurrentPasscode: function (guid) {
					var value = settings.getFromStorage(passcodeConst.KEY);
					if (guid) {
						value = settings.decrypt(guid, value);
					}
					return value;
				},
				clearTimestamp: function(){
					settings.saveToStorage(passcodeConst.TIMESTAMP_KEY, false);
				}
			};

			var utils = BaseUtils.extend({
				savePasscode: function (value, guid) {
					guid = guid || PHRASE; //TODO: change pass phrase to patient guid
					var encypted = this.encrpyt(guid, value);
					this.saveToStorage(passcodeConst.KEY, encypted);
					privateValue.clearTimestamp();
				},
				validate: function (passcode, guid) {
					guid = guid || PHRASE; //TODO: change pass phrase to patient guid
					var current = privateValue.getCurrentPasscode(guid), result = passcode === current;
					result && privateValue.clearTimestamp();
					return result; //convert to string
				},
				updatePasscodeTimeout: function () {
					if (this.isPasscodeDisabled() && !settings.isSetupComplete()) {
						return;
					} else {
						var date = new Date();
						date.setTime(date.getTime() - (passcodeConst.EXPIRED_IN_MINUTE * 60 * 1000));
						this.saveToStorage(passcodeConst.TIMESTAMP_KEY, date.toJSON());
					}
				},
				changePasscode: function () {
					//TODO: open setup/pin
				},
				togglePasscode: function (value) {
					if (value === false) {
						this.deleteFromStorage(passcodeConst.KEY);
					}
					settings.togglePasscode(value);
				},
				isInvalidPasscode: function () {
					var timestamp, now = new Date(), isInvalid = true;
					timestamp = this.getFromStorage(passcodeConst.TIMESTAMP_KEY);
					isInvalid = timestamp === false ? timestamp : timestamp === null ? isInvalid : new Date(timestamp) < now;
					return isInvalid;
				},
				isPasscodeEnabled: function () {
					return settings.isPasscodeValid() && this.isExist();
				},
				isPasscodeDisabled: function () {
					return settings.isPasscodeValid() === false && this.isExist() === false;
				},
				isExist: function () {
					var code = privateValue.getCurrentPasscode();
					return !!code;
				},
				reset: function () {
					this.deleteFromStorage(passcodeConst.KEY);
				}
			});
			return new utils();
		});

