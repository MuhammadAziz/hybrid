define([
	'text!views/demo/demo.html',
	'views/baseview',
	'data/demo/demo-datasource'
], function (html, View, todoDatasource) {

	var view, navbar, category;

	var model = kendo.observable({
		todoDatasource: todoDatasource
	});

	var events = {
		onInit: function (e) {
			navbar = e.view.header.find('.km-navbar').data('kendoMobileNavBar');
		},
		onAfterShow: function (e) {
			category = e.view.params.category || 'MediRecords Demo';
			todoDatasource.filter({field: 'category', operator: 'eq', value: category});
			navbar.title(category);
		}
	};

	view = new View('demo', html, model, events);

	//The $.subscribe method there at the end is part of our tiny PubSub library and that function will be called whenever the /newTodo/add event is fired
	$.subscribe('/newDemo/add', function (e, text) {
		todoDatasource.add({title: text, category: category});
	});
	return view;
});