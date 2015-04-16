define(function () {
	var categoriesDatasource = new kendo.data.DataSource({
		data: [
			{name: 'MediRecords Demo'},
			{name: 'Other'}
		]
	});
	return categoriesDatasource;
});