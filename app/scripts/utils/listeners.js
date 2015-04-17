define([
	'utils/passcode-helper'
],function (passcode) {
	var Listener = {
		run: function (options) {
			document.addEventListener("resign", function () {
				setTimeout(function(){
					passcode.updatePasscodeTimeout();
				}, 0);
				
			}, true);
			
			document.addEventListener("pause", function () {
				setTimeout(function(){
					passcode.updatePasscodeTimeout();
				}, 0);
			}, true);
			
			document.addEventListener("error", options.errorHandler, true);
            
			document.addEventListener("backbutton", function (e) {
				var his = mrapp.mobile.pane.history;
				if(his.length <= 2){//his[0] = initial page, his[1] = first page
					passcode.updatePasscodeTimeout();
					navigator.app && navigator.app.exitApp();
				}else{
					mrapp.mobile.navigate("#:back");
				}
			}, false);

			// Handle "orientationchange" event
    		document.addEventListener('orientationchange', options.fixViewResize);

    		window.addEventListener('error', options.errorHandler);
		}
	};
	return Listener;
});


