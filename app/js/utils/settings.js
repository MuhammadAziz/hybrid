define(["utils/base-utils"], function(BaseUtils){
	var KEY = {
		SETUP_COMPLETE: "settings:setupComplete",
		LOGGED_IN: "settings:loggedIn",
		PASSCODE_VALID: "settings:passcodeValid"
	};
	var Settings = BaseUtils.extend({
		setSetupComplete: function(){
			this.saveToStorage(KEY.SETUP_COMPLETE, true);
		},
		loggedIn:function(){
			this.saveToStorage(KEY.LOGGED_IN, true);
		},
		togglePasscode: function(state){
			this.saveToStorage(KEY.PASSCODE_VALID, state);
		},
		isSetupComplete: function () {
			return this.getFromStorage(KEY.SETUP_COMPLETE);
		},
		isPasscodeValid: function () {
			return this.getFromStorage(KEY.PASSCODE_VALID);
		},
		isLoggedIn: function () {
			return this.getFromStorage(KEY.LOGGED_IN);
		},
		setDefault: function(){
			// this.saveToStorage(SETTINGS_KEY, settings_default);
		}
	});
	return new Settings();
});