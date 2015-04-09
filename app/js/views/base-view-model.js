define(function () {
	var App = window.App = window.App || {model: {}};
	var MediRecordsObservable = kendo.data.ObservableObject.extend({
		init: function () {
			kendo.data.ObservableObject.fn.init.call(this, arguments);
		},
		onInit: function () {

		},
		onAfterShow: function () {

		}
	});
	App.mrapp = function (options) {
		return new MediRecordsObservable(options);
	};
	return MediRecordsObservable;
});

