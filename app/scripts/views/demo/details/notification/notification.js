define([
	'text!./notification.html'
], function (html) {
	var notification = mrapp.view({
		html: html,
		name: 'notification',
		onInit: function (e) {
			// set some global defaults for all local notifications
			window.plugin.notification.local.setDefaults({
				autoCancel: true // removes the notification from notification centre when clicked
			});
			// triggered when a notification was clicked outside the app (background)
			window.plugin.notification.local.onclick = function (id, state, json) {
				var message = 'ID: ' + id + (json === '' ? '' : '\nData: ' + json);
			};
			// triggered when a notification is executed while using the app (foreground)
			// on Android this may be triggered even when the app started by clicking a notification
			window.plugin.notification.local.ontrigger = function (id, state, json) {
				var message = 'ID: ' + id + (json === '' ? '' : '\nData: ' + json);
				navigator.notification.alert(message, null, 'Notification received while the app was in the foreground', 'Close');
			};
		},
		showToast: function (text) {
			setTimeout(function () {
//				window.plugins.toast.showShortBottom(text);
			}, 100);
		},
		showMessageWithoutSound: function () {
			this.notify({
				id: 1,
				title: 'I\'m the title!',
				message: 'Sssssh!',
				sound: null,
				date: this.getNowPlus10Seconds()
			});
		},
		showMessageWithDefaultSound: function () {
			this.notify({
				id: '2', // you don't have to use an int by the way.. '1a' or just 'a' would be fine
				title: 'Sorry for the noise',
				message: 'Unless you have sound turned off',
				date: this.getNowPlus10Seconds()
			});
		},
		showMessageWithData: function () {
			this.notify({
				id: 3,
				message: 'I have data, click me to see it',
				json: JSON.stringify({test: 123}),
				date: this.getNowPlus10Seconds()
			});
		},
		showMessageWithBadge: function () {
			this.notify({
				id: 4,
				title: 'Your app now has a badge',
				message: 'Clear it by clicking the \'Cancel all\' button',
				badge: 1,
				date: this.getNowPlus10Seconds()
			});
		},
		showMessageWithSoundEveryMinute: function () {
			this.notify({
				id: 5,
				title: 'I will bother you every minute',
				message: '.. until you cancel all notifications',
				repeat: 'minutely',
				autoCancel: false,
				date: this.getNowPlus10Seconds()
			});
		},
		cancelAll: function () {
			var that = this;
			if (!this.checkSimulator()) {
				window.plugin.notification.local.cancelAll(function () {
					that.showToast('ok, all cancelled');
				});
			}
		},
		getScheduledNotificationIDs: function () {
			if (!this.checkSimulator()) {
				window.plugin.notification.local.getScheduledIds(function (scheduledIds) {
					navigator.notification.alert(scheduledIds.join(', '), null, 'Scheduled Notification ID\'s', 'Close');
				});
			}
		},
		notify: function (payload) {
			var that = this;
			if (!this.checkSimulator()) {
				window.plugin.notification.local.add(payload, function () {
					that.showToast('ok, scheduled');
				});
			}
		},
		getNowPlus10Seconds: function () {
			return new Date(new Date().getTime() + 10 * 1000);
		},
		checkSimulator: function () {
			if (window.navigator.simulator === true) {
				alert('This plugin is not available in the simulator.');
				return true;
			} else if (window.plugin === undefined) {
				alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
				return true;
			} else {
				return false;
			}
		}
	});
	return notification.newInstance;
});