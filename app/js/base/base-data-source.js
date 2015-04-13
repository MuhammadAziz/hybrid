define(['utils/base-utils'], function(utils){
    var mrapp = window.mrapp = window.mrapp || {};
	var DataSource = kendo.data.DataSource.extend({
		offline: null,
		offlineStorage: {
			getItem: function(){
				var key = this.offline || "default_key";
				if(this.offline){
					return utils.getFromStorage(key);
				}else{
					throw new Error("mrapp.data(): datasource offline key should be defined");
				}
			},
			setItem: function(item){
				var key = this.offline || "default_key";
				if(this.offline){
					return utils.saveToStorage(key, item);
				}else{
					throw new Error("mrapp.data(): datasource offline key should be defined");
				}
			}
		},
		init: function(element, options){
			var that = this;
			kendo.data.DataSource.fn.init.call(that, element, options);
			
			document.addEventListener("online", function(){
				window.plugins.toast.showShortBottom("Network connection detected, perform sync data");
				that.online(true);
			}, false);
			
			document.addEventListener("offline", function(){
				window.plugins.toast.showShortBottom("No network detected, data will be synchronize when get back online");
				that.online(false);
			}, false);
		}
	});
	mrapp.data = function(options){
		return new DataSource(options);
	};
    return DataSource;
});