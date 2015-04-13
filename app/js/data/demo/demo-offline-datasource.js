define(function () {
	var offlineDatasource = new mrapp.data({
		transport: {
                read: {
                    url: "http://mtmac15.mitrais.com:3000/list",
                    dataType: "json"
                },
                update: {
                    url: "http://demos.telerik.com/kendo-ui/service/tasks/update",
                    dataType: "jsonp"
                },
                create: {
                    url: "http://mtmac15.mitrais.com:3000/employee/json",
                    dataType: "json",
                    type:'POST'
                },
                destroy: {
                    url: "http://demos.telerik.com/kendo-ui/service/tasks/destroy",
                    dataType: "jsonp"
                },
                // parameterMap: function(options, operation) {
                //     debugger;
                //     if (operation !== "read" && options.models) {
                //         return {models: kendo.stringify(options.models)};
                //     }
                // }
            },
            schema: {
                model: {
                    id: "taskId",
                    fields: {
                        title: { from: "title", defaultValue: "Bang" },
                        name: {type: "string"}
                    }
                }
            }
	});
	return offlineDatasource;
});