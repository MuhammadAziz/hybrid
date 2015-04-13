define([
	'text!./email.html'
], function (html) {
	var email = mrapp.view({
		html: html,
		name: 'email',
		onInit: function (e) {
			email.resultsField = document.getElementById("view-email-result");
		},
		resultsField: null,
		send: function (e) {
			var that = this;
			cordova.plugins.email.open({
				to: 'Muhammad.Aziz@mitrais.com',
				cc: '',
				bcc: [''],
				subject: that.formData.subject,
				body: that.formData.body
			});
		},
		formData: {
			subject: "Test Subject",
			body: "Test email content"
		},
		_addMessageToLog: function (message) {
			var that = this, currentMessage = that.resultsField.innerHTML;
			that.resultsField.innerHTML = currentMessage + message + '<br />';
		}
	});
	
	return email;
});