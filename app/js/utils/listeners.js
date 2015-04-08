define([
	'utils/passcode-helper'
],function (passcode) {
	var Listener = {
		run: function () {
			document.addEventListener("pause", function () {
				passcode.updatePasscodeCookie();
			});
			document.addEventListener("error", function () {
				alert("error occured");
			});
		}
	};
	return Listener;
});


