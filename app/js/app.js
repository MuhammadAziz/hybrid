define([
	'views/demo/demo',
	'views/categories/categories',
	'views/newDemo/newDemo',
	'views/newCategory/newCategory',
	'views/demo-details/camera/camera',
	'views/demo-details/gallery/gallery',
	'views/demo-details/barcode/barcode',
	'views/demo-details/geolocation/geolocation',
	'views/demo-details/upload/upload',
	'views/demo-details/email/email',
	'views/demo-details/sms/sms',
	'views/demo-details/calendar/calendar',
	'views/demo-details/contacts/contacts',
	'views/demo-details/notification/notification' //notifications
], function () {
	// create a global container object
	var App = window.App = window.App || {};

	App.init = function () {
		// intialize the application
		App.mobile = new kendo.mobile.Application(document.body, {skin: 'flat'});
	};

	return App;

});