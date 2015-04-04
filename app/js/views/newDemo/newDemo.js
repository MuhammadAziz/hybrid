define([
	'text!views/newDemo/newDemo.html',
	'views/baseview'
], function (html, View) {

	var view, modalView;

	var model = kendo.observable({
		text: null,
		add: function (e) {
			$.publish('/newDemo/add', [this.get('text')]);
			modalView.close();
		},
		close: function (e) {
			modalView.close();
		}
	});

	var events = {
		onInit: function (e) {
			modalView = e.sender;
		}
	};

	view = new View('newDemo', html, model, events);

	return view;
});