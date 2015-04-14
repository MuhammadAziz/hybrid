define([
	'text!./storage.html',
	'data/demo/demo-offline-datasource',
], function (html, storageDatasource) {
	var view, navbar, category;
    var model = mrapp.view({
        html: html,
        name: 'storage',
        storageDatasource: storageDatasource,
        onInit: function (e) {
			navbar = e.view.header.find('.km-navbar').data('kendoMobileNavBar');
		},
		onAfterShow: function (e) {
			storageDatasource.read();
			// category = e.view.params.category || 'MediRecords Demo';
			// todoDatasource.filter({field: 'category', operator: 'eq', value: category});
			// navbar.title(category);
		},
		formData:{
			name: null,
		},
		add: function(e){
			var employee = {};
			if(model.formData.name){
				employee.title = "Bang";
				employee.name = model.formData.name;
				storageDatasource.add(employee);
				this.resetForm("formData");
			}else{
				this.toast("Please enter name");
			}
		}
    });

	//The $.subscribe method there at the end is part of our tiny PubSub library and that function will be called whenever the /newTodo/add event is fired
	// $.subscribe('/newDemo/add', function (e, text) {
	// 	todoDatasource.add({title: text, category: category});
	// });
	return model;
});