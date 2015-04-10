define([
	'text!views/demo-details/barcode/barcode.html',
	'views/baseview'
], function (html, View) {
	var barcode = kendo.observable({
		resultsField: null,
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
	var events = {
		onInit: function (e) {
			barcode.resultsField = document.getElementById("view-barcode-result");
		}
	};
	var view = new View('barcode', html, barcode, events);
	return view;
});