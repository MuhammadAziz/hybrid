define([
	'text!./demo.html',
	'data/demo/demo-datasource',
    'views/demo/details/barcode/barcode',
    'views/demo/details/calendar/calendar',
    'views/demo/details/camera/camera',
    'views/demo/details/contacts/contacts',
    'views/demo/details/email/email',
    'views/demo/details/gallery/gallery',
    'views/demo/details/geolocation/geolocation',
    'views/demo/details/network-connection/network-connection',
    'views/demo/details/notification/notification',
    'views/demo/details/sms/sms',
    'views/demo/details/upload/upload',
    'views/demo/details/storage/storage'
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