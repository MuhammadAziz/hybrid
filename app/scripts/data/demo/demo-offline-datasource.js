define(function () {
	var offlineDatasource = mrapp.data({
        // offlineStorage: "offlineStorage",
        offline: "offlineStorage",
        autoSync: true,
        connect: "Synchronize data",
        disconnect: "Offline mode activated",
		transport: {
                read: {
                    url: "http://mtmac15.mitrais.com:8080/list",
                    dataType: "json"
                },
                update: {
                    url: "http://mtmac15.mitrais.com:8080/update",
                    dataType: "json"
                },
                create: {
                    url: "http://mtmac15.mitrais.com:8080/employee/json",
                    dataType: "json",
                    type:'POST'
                },
                destroy: {
                    url: "http://demos.telerik.com/kendo-ui/service/tasks/destroy",
                    dataType: "json"
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