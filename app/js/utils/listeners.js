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
				var his = mrapp.mobile.pane.history;
				if(his.length <= 2){//his[0] = initial page, his[1] = first page
					navigator.app && navigator.app.exitApp();
				}else{
					mrapp.mobile.navigate("#:back");
				}
			}, false);
		}
	};
	return Listener;
});


