define(["utils/base-utils"], function(BaseUtils){
	var SETTINGS_KEY = "key_settings";
	var settings_default = {
		FIRST_LAUNCH: true,
		STATE_PASSCODE: true,
		LOGGED_IN: true
	};
	var Settings = BaseUtils.extend({
		disableFirstLaunch: function(){
			this.saveToStorage(SETTINGS_KEY, {FIRST_LAUNCH: false});
		},
		loggedIn:function(){
			this.saveToStorage(SETTINGS_KEY, {LOGGED_OUT: true});
		},
		togglePasscode: function(state){
			this.saveToStorage(SETTINGS_KEY, {STATE_PASSCODE: state});
		},
		isFirstLaunch: function () {
			debugger;
			var settings = this.getFromStorage(SETTINGS_KEY);
			return settings && typeof settings.FIRST_LAUNCH !== 'undefined' ? settings.FIRST_LAUNCH : true;
		},
		isPasscode: function () {
			var settings = this.getFromStorage(SETTINGS_KEY);
			return settings && typeof settings.STATE_PASSCODE !== 'undefined' ? settings.STATE_PASSCODE : false;
		},
		isLoggedIn: function () {
			var settings = this.getFromStorage(SETTINGS_KEY);
			return settings && typeof settings.LOGGED_IN !== 'undefined' ? settings.LOGGED_IN : false;
		},
		setDefault: function(){
			debugger;
			this.saveToStorage(SETTINGS_KEY, settings_default);
		}
	});
	return new Settings();
});