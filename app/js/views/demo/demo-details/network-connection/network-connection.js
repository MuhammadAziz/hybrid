define([
	'text!views/demo-details/network-connection/network-connection.html',
	'views/baseview'
], function (html, View) {
	var networkConnection = kendo.observable({
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
	var events = {
		onInit: function (e) {
			networkConnection.resultsField = document.getElementById("view-network-connection-result");
		}
	};
	var view = new View('networkConnection', html, networkConnection, events);
	return view;
});