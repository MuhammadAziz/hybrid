define(function () {
	var offlineDatasource = new mrapp.data({
        // offlineStorage: "offlineStorage",
        offline: "offlineStorage",
        connect: "Synchronize data",
        disconnect: "Offline mode activated",
		transport: {
                read: {
                    url: "http://mtmac15.mitrais.com:3000/list",
                    dataType: "json"
                },
                update: {
                    url: "http://mtmac15.mitrais.com:3000/update",
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
                }
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