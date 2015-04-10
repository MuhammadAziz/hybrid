define([
	'text!views/demo-details/email/email.html',
	'views/baseview'
], function (html, View) {
	var email = kendo.observable({
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
	var events = {
		onInit: function (e) {
			email.resultsField = document.getElementById("view-email-result");
		}
	};
	var view = new View('email', html, email, events);
	return view;
});