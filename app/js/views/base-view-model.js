define(function () {
	var mrapp = window.mrapp = window.mrapp || {model: {}};
	var MediRecordsObservable = kendo.data.ObservableObject.extend({
		init: function (options) {
			kendo.data.ObservableObject.fn.init.call(this, options);
			if (options.html && options.hasOwnProperty("html")) {
				$(options.html).appendTo(document.body);
			} else {
				throw new Error("mrapp.view(): html view shoud be defined");
			}
			if (options.name && options.hasOwnProperty("name")) {
				mrapp.model[options.name] = this;
			} else {
				throw new Error("mrapp.view(): view model name shoud be defined");
			}
		},
		onInit: function () {

		},
		onAfterShow: function () {

		},
		resetView: function (e) {

		}
	});
	mrapp.view = function (options) {
		return new MediRecordsObservable(options);
	};
	return MediRecordsObservable;
});

