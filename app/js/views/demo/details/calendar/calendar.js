define([
	'text!views/demo/details/calendar/calendar.html'
], function (html) {
	var calendar;
//	var title = 'My Event Title';
//	var location = 'My Event Location';
//	var notes = 'My interesting Event notes.';
	var startDate = new Date();
	var endDate = new Date();
	var calendarName = "MyCal";

	// clean up the dates a bit
	startDate.setMinutes(0);
	endDate.setMinutes(0);
	startDate.setSeconds(0);
	endDate.setSeconds(0);
//
//	// add a few hours to the dates, JS will automatically update the date (+1 day) if necessary
	startDate.setHours(startDate.getHours() + 2);
	endDate.setHours(endDate.getHours() + 3);
	var calendarView = mrapp.view({
        html: html,
        name: 'calendar',
        onInit: function (e) {
			calendarView.resultsField = document.getElementById("view-calendar-result");
			calendar = window.plugins.calendar;
		},
		formData: {
			startDate: startDate,
			endDate: endDate,
			title: "Daily Meetting",
			location: "Sadewa Room",
			notes: ""
		},
		createEvent: function () {
			var data = this.formData;
			if (!this.checkSimulator()) {
				calendar.createEvent(data.title, data.location, data.notes, data.startDate, data.endDate, this.onSuccess, this.onError);
			}
		},
		createEventWithOptions: function () {
			var data = this.formData;
			if (!this.checkSimulator()) {
				var calOptions = window.plugins.calendar.getCalendarOptions(); // grab the defaults
				calOptions.firstReminderMinutes = 120; // default is 60, pass in null for no reminder/alarm
				calOptions.secondReminderMinutes = 60;
				calendar.createEventWithOptions(data.title, data.location, data.notes, data.startDate, data.endDate, calOptions, this.onSuccess, this.onError);
			}
		},
		createEventInteractively: function () {
			var data = this.formData;
			if (!this.checkSimulator()) {
				calendar.createEventInteractively(data.title, data.location, data.notes, data.startDate, data.endDate, this.onSuccess, this.onError);
			}
		},
		findEvent: function () {
			var data = this.formData;
			if (!this.checkSimulator()) {
				calendar.findEvent(data.title, data.location, data.notes, startDate, endDate, this.onSuccess, this.onError);
			}
		},
		deleteEvent: function () {
			var data = this.formData;
			if (!this.checkSimulator()) {
				calendar.deleteEvent(data.title, data.location, data.notes, startDate, endDate, this.onSuccess, this.onError);
			}
		},
		listEventsInRange: function () {
			if (!this.checkSimulator()) {
				var fromDate = new Date();
				var toDate = new Date();
				toDate.setFullYear(2050);
				calendar.listEventsInRange(fromDate, toDate, this.onSuccess, this.onError);
			}
		},
		createCalendar: function () {
			var data = this.formData;
			if (!this.checkSimulator()) {
				// note that calendars have a color on iOS which you can set by passing in an instance of
				// window.plugins.calendar.getCreateCalendarOptions() instead of a calendarName.
				calendar.createCalendar(calendarName, this.onSuccess, this.onError);
			}
		},
		createEventInNamedCalendar: function () {
			var data = this.formData;
			if (!this.checkSimulator()) {
				calendar.createEventInNamedCalendar(data.title, data.location, data.notes, data.startDate, data.endDate, calendarName, this.onSuccess, this.onError);
			}
		},
		findAllEventsInNamedCalendar: function () {
			if (!this.checkSimulator()) {
				calendar.findAllEventsInNamedCalendar(calendarName, this.onSuccess, this.onError);
			}
		},
		deleteCalendar: function () {
			if (!this.checkSimulator()) {
				calendar.deleteCalendar(calendarName, this.onSuccess, this.onError);
			}
		},
		checkSimulator: function () {
			if (window.navigator.simulator === true) {
				alert('This plugin is not available in the simulator.');
				return true;
			} else if (window.plugins === undefined || window.plugins.calendar === undefined) {
				alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
				return true;
			} else {
				return false;
			}
		},
		// callbacks
		onSuccess: function (msg) {
			alert('Calendar success: ' + JSON.stringify(msg));
		},
		onError: function (msg) {
			alert('Calendar error: ' + JSON.stringify(msg));
		}
	});
	return calendarView;
});