define(function () {
	var todoDatasource = new kendo.data.DataSource({
		data: [
			{title: 'Talk to corporate', category: 'Work', target: null},
			{title: 'Promote synergy', category: 'Work', target: null},
			{title: 'Eat a bagel', category: 'Personal', target: null},
			{title: 'Eat some chicken strips', category: 'Personal', target: null},
			{title: 'Camera', category: 'MediRecords Demo', target:'camera'},
			{title: 'Gallery', category: 'MediRecords Demo', target:'gallery'},
			{title: 'Barcode', category: 'MediRecords Demo', target:'barcode'},
			{title: 'Geolocation', category: 'MediRecords Demo', target:'geolocation'},
			{title: 'Notifications', category: 'MediRecords Demo', target:'notification'},
			{title: 'SMS', category: 'MediRecords Demo', target:'sms'},
			{title: 'Email', category: 'MediRecords Demo', target:'email'},
			{title: 'Upload', category: 'MediRecords Demo', target:'upload'},
			{title: 'Calendar', category: 'MediRecords Demo', target:'calendar'},
			{title: 'Contacts', category: 'MediRecords Demo', target:'contacts'},
			{title: 'Storage', category: 'MediRecords Demo', target:'storage'}
		]
	});
	return todoDatasource;
});