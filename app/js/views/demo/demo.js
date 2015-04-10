define([
	'text!views/demo/demo.html',
	'data/demo/demo-datasource'
], function (html, todoDatasource) {
	var view, navbar, category;
    var model = mrapp.view({
        html: html,
        name: 'demo',
        todoDatasource: todoDatasource,
        onInit: function (e) {
			navbar = e.view.header.find('.km-navbar').data('kendoMobileNavBar');
		},
		onAfterShow: function (e) {
			category = e.view.params.category || 'MediRecords Demo';
			todoDatasource.filter({field: 'category', operator: 'eq', value: category});
			navbar.title(category);
		}
    });

	//The $.subscribe method there at the end is part of our tiny PubSub library and that function will be called whenever the /newTodo/add event is fired
	$.subscribe('/newDemo/add', function (e, text) {
		todoDatasource.add({title: text, category: category});
	});
	return model;
});