define([
	'utils/passcode-helper'
],function (passcode) {
	var Listener = {
		run: function () {
			
			document.addEventListener("resign", function () {
				passcode.updatePasscodeTimeout();
			}, false);
			
			document.addEventListener("pause", function () {
				passcode.updatePasscodeTimeout();
			}, false);
			
			document.addEventListener("error", function () {
				alert("error occured");
			}, false);
            
			document.addEventListener("backbutton", function (e) {
                //TODO:
                //if view contain data-role="backbutton"
                // navigator.app.backHistory()
                //else
                //navigator.app.exitApp();
			}, false);
		}
	};
	return Listener;
});


