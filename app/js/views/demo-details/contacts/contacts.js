define([
	'text!views/demo-details/contacts/contacts.html',
	'views/baseview'
], function (html, View) {
	var contactsView = kendo.observable({
		contact: null,
		result: null,
		setResults: function (value) {
			this.set("result", value);
		},
		formData: {
			nickname: null,
			displayName: null,
			name: {
				givenName: "Aziz Muhammad",
				familyName: "FamilyName"
			},
			addresses:{
				type: "Home",
				streetAddress: "12345 Some St.",
				locality: "Denpasar",
				region: "Bali",
				postalCode: "99999",
				country: "Indonesia"
			},
			phoneNumbers: {
				work: "212-555-1212",
				mobile: "530-555-1212",
				home: "718-555-1212"
			},
			emails: {
				home: "home@email.com",
				work: "work@email.com"
			}
		},
		_constructContact: function(){
			var contact = navigator.contacts.create(), data = this.formData, name, addresses, phoneNumbers, emails;
			name = new ContactName();
			addresses = new ContactAddress();
			phoneNumbers = [];
			emails = [];
			
			$.extend(name, data.name);
			$.extend(addresses, data.addresses);
			
			phoneNumbers.push(new ContactField('work', data.phoneNumbers.work, false));
			phoneNumbers.push(new ContactField('mobile', data.phoneNumbers.mobile, true)); // the preferred number
			phoneNumbers.push(new ContactField('home', data.phoneNumbers.home, false));
			emails.push(new ContactField('home', data.emails.home, false));
			emails.push(new ContactField('work', data.emails.work, true)); // the preferred email
			
			contact.name = name;
			contact.addresses = [addresses];
			contact.phoneNumbers = phoneNumbers;
			contact.emails = emails;
			return contact;
		},
		createContact: function () {
			var that = this;
			that.setResults();

			// This code will create a new contact, even if
			// you have already run this code. It will lose its reference
			// to the original contact, and retrieve a reference to a new one.

			that.contact = that._constructContact();
			debugger;
//			var name = new ContactName();
//			name.givenName = "Telerik AppBuilder Test";
//			name.familyName = "Sample Contact";
//			that.contact.name = name;
//
//			// Create a single address for the contact.
//			var address = new ContactAddress();
//			address.type = "Home";
//			address.streetAddress = "12345 Some St.";
//			address.locality = "Locality";
//			address.region = "Region";
//			address.postalCode = "99999";
//			address.country = "United States of America";
//			that.contact.addresses = [address];
//
//			// Create three phone numbers for the contact.
//			var phoneNumbers = [3];
//			phoneNumbers[0] = new ContactField('work', '212-555-1212', false);
//			phoneNumbers[1] = new ContactField('mobile', '530-555-1212', false);
//			phoneNumbers[2] = new ContactField('home', '718-555-1212', true); // the preferred number
//			that.contact.phoneNumbers = phoneNumbers;
//
//			// Create two emails for the contact.
//			var emails = [2];
//			emails[0] = new ContactField('home', 'home@email.com', false);
//			emails[1] = new ContactField('work', 'work@email.com', true);
//			that.contact.emails = emails;
			that.contact.save(function () {
				that.onSaveSuccess.apply(that, arguments);
			}, function () {
				that.onSaveError.apply(that, arguments);
			});
		},
		onSaveSuccess: function (contact) {
			var that = this;
			that.contact = contact;

			that.setResults(
					"Contact saved successfully. Look in Address Book to view the contact:<br/>" +
					contact.name.givenName + "<br/>" + contact.name.familyName);
		},
		onSaveError: function (contactError) {
			var that = this;
			that.setResults("Save error = " + contactError.code);
		},
		findContact: function () {
			// Find all contacts containing the filter name.
			// You should first click Create Contact button, before calling this method.
			var that = this,
					options = new ContactFindOptions(),
					// Search for the filter name, allowing multiple matches.
					fields = ["displayName", "name"];

			options.filter = "Telerik AppBuilder Test";
			options.multiple = true;
			navigator.contacts.find(fields, function () {
				that.onFindSuccess.apply(that, arguments);
			}, function () {
				that.onFindFailure.apply(that, arguments);
			}, options);
		},
		onFindSuccess: function (contacts) {
			var that = this;

			that.setResults();
			// Display the results.
			that.setResults("Found " + contacts.length + " contact" + (contacts.length === 1 ? "." : "s."));
			for (var i = 0; i < contacts.length; i++) {
				var contact = contacts[i];
				var result = "<br/>Found: ";
				if (contact) {
					if (contact.name && contact.name.givenName) {
						result += contact.name.givenName + " ";
					}
					if (contact.name && contact.name.familyName) {
						result += contact.name.familyName + " ";
					}
					if (contact.id) {
						result += "(id = " + contact.id + ")";
					}
				}
				that.setResults(result);
			}
		},
		onFindFailure: function (contactError) {
			var that = this;

			that.setResults("Find error = " + contactError.code);
		},
		cloneContact: function () {
			var that = this;
			that.setResults();

			if (!that.contact) {
				that.setResults(
						"Contact hasn't yet been set." +
						"</br>Click 'Create New Contact' first.");
			} else {
				var clone = that.contact.clone();
				clone.name.givenName = "ClonedSampleContact";
				clone.emails[0].value = "cloned@email.com";

				that.setResults("Cloned contact:<br/>" +
						"Name: " + clone.name.givenName + " " + clone.name.familyName + "<br/>" +
						"Email: " + clone.emails[0].value + "<br/>" +
						"Address: " + clone.addresses[0].streetAddress + "<br/>" +
						"<br/>" +
						"Note that the clone hasn't been saved, and won't appear in your address book."
						);
			}
		},
		removeContact: function () {
			var that = this;
			that.setResults();
			if (!that.contact) {
				that.setResults(
						"Contact hasn't yet been set." +
						"</br>Click 'Create New Contact' first.");
			} else {
				that.contact.remove(function () {
					that.onRemoveSuccess.apply(that, arguments);
				}, function () {
					that.onRemoveFailure.apply(that, arguments);
				});
			}
		},
		onRemoveSuccess: function () {
			var that = this;

			that.contact = null;
			that.setResults("Contact removed successfully.");
		},
		onRemoveFailure: function (contactError) {
			var that = this;

			that.setResults("Remove error = " + contactError.code);
		}
	});
	var events = {
		onInit: function (e) {
			contactsView.resultsField = document.getElementById("view-contacts-result");
		}
	};
	var view = new View('contacts', html, contactsView, events);
	return view;
});