define(['mrapp'], function (mrapp) {
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
			//scroll view to top
			e.view.scroller.reset();
			
			//clear active tab strip
			e.view.footer.find('[data-role-tabstrip]')
					.data('kendoMobileTabStrip')
					.clear();
		}
	});
	mrapp.view = function (options) {
		return new MediRecordsObservable(options);
	};
	return MediRecordsObservable;
});

