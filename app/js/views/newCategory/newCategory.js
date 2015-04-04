define([
	'text!views/newCategory/newCategory.html',
	'views/baseview'
], function (html, View) {

	var view, modalView;

	var model = kendo.observable({
		text: null,
		close: function (e) {
			modalView.close();
		},
		add: function (e) {
			$.publish('/newCategory/add', [this.get('text')]);
			modalView.close();
		}
	});

	var events = {
		onInit: function (e) {
			modalView = e.sender;
		}
	};

	view = new View('newCategory', html, model, events);

	return view;

});