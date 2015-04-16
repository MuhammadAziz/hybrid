define([
	'utils/passcode-helper'
],function (passcode) {
	var Listener = {
		run: function () {
			document.addEventListener("resign", function () {
				setTimeout(function(){
					// passcode.updatePasscodeTimeout();
					localStorage.setItem("test", "test");
				}, 0);
				
			}, true);
			
			document.addEventListener("pause", function () {
				setTimeout(function(){
					// passcode.updatePasscodeTimeout();
					localStorage.setItem("test", "test");
				}, 0);
			}, true);
			
			document.addEventListener("error", function () {
				// alert("error occured");
			}, true);
            
			document.addEventListener("backbutton", function (e) {
				var his = mrapp.mobile.pane.history;
				if(his.length <= 2){//his[0] = initial page, his[1] = first page
					passcode.updatePasscodeTimeout();
					navigator.app && navigator.app.exitApp();
				}else{
					mrapp.mobile.navigate("#:back");
				}
			}, false);
		}
	};
	return Listener;
});


