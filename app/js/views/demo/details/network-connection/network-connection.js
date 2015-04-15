define([
	'text!./network-connection.html'
], function (html) {
	var networkConnection = mrapp.view({
		html: html,
		name: 'networkConnection',
		onInit: function (e) {
			networkConnection.resultsField = document.getElementById("view-network-connection-result");
		},
		checkConnection: function () {
			var that = this,
					networkState = navigator.connection.type,
					messageConnectionType = document.getElementById("messageConnectionType"),
					currentTimeDiv = document.getElementById("currentTime");

			messageConnectionType.textContent = networkState;
			var now = new Date().toLocaleTimeString().split(" ")[0];

			currentTimeDiv.textContent = now;
		}
	});
	
	return networkConnection.newInstance;
});