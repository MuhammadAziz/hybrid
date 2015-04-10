define([
	'text!views/demo/details/barcode/barcode.html'
], function (html) {
	var barcode = mrapp.view({
        html: html,
        name: 'barcode',
		resultsField: null,
        onInit: function (e) {
			barcode.resultsField = document.getElementById("view-barcode-result");
		},
		scan: function (e) {
			this._scan();
		},
		_scan: function () {
			var that = this;
			if (window.navigator.simulator === true) {
				alert("Not Supported in Simulator.");
			}
			else {
				var success = function (result) {
					if (!result.cancelled) {
						that._addMessageToLog(result.format + " | " + result.text);
					}
				};
				var error = function (error) {
					console.log("Scanning failed: " + error);
				};
				cordova.plugins.barcodeScanner.scan(success, error);
			}
		},
		_addMessageToLog: function (message) {
			var that = this, currentMessage = that.resultsField.innerHTML;
			that.resultsField.innerHTML = currentMessage + message + '<br />';
		}
	});
    return barcode;
});