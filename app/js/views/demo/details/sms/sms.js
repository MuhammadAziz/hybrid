define([
	'text!./sms.html'
], function (html) {
	var smsModule = mrapp.view({
		html: html,
		name: 'sms',
		resultsField: null,
		onInit: function (e) {
			
		},
		send: function (e) {
			var number = this.formData.number;
			var message = this.formData.message;
			var options = {
				replaceLineBreaks: false, // true to replace \n by a new line, false by default
				android: {
					intent: 'INTENT'  // send SMS with the native android SMS messaging
//					intent: '' // send SMS without open any other app
				}
			};
			var success = function () {
				alert('Message sent successfully');
			};
			var error = function (e) {
				alert('Message Failed:' + e);
			};
			sms.send(number, message, options, success, error);
		},
		formData: {
			number: "085646562288",
			message: "Test sms content"
		},
		_addMessageToLog: function (message) {
			var that = this, currentMessage = that.resultsField.innerHTML;
			that.resultsField.innerHTML = currentMessage + message + '<br />';
		}
	});
	return smsModule;
});