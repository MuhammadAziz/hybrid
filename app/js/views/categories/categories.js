define([
	'text!views/categories/categories.html',
	'views/baseview',
	'data/categories/categoriesDatasource'
], function (html, View, categoriesDatasource) {

	var model = {
		categoriesDatasource: categoriesDatasource,
		title: 'Title'
	};

	var view = new View('categories', html, model);

	$.subscribe('/newCategory/add', function (e, text) {
		categoriesDatasource.add({name: text});
	});

	return view;
});