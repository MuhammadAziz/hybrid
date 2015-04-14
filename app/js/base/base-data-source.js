define(['utils/base-utils'], function(BaseUtils){
    var mrapp = window.mrapp = window.mrapp || {}, utils = new BaseUtils();
    var connectMessage = "Connected to MediRecords, perform synchronize data";
    var disconnectMessage = "Disconnected from MediRecords, data will be synchronize when online";
	var DataSource = kendo.data.DataSource.extend({
		init: function(element, options){
			var that = this;
			if(element.offline){
				module.offlineKey = element.offline;
				element.offlineStorage = module;
				element.autoSync = true;
			}
			kendo.data.DataSource.fn.init.call(that, element, options);
			
			document.addEventListener("online", function(){
				window.plugins.toast.showShortBottom(element.connect || connectMessage);
				that.online(true);
			}, false);
			
			document.addEventListener("offline", function(){
				window.plugins.toast.showShortBottom(element.disconnect || disconnectMessage);
				that.online(false);
			}, false);
		}
	}),
	module = {
		offlineKey: null,
		getItem: function(){
			return localStorage.getItem(this.offlineKey);
		},
		setItem: function(item){
			if(item.length){
				return localStorage.setItem(this.offlineKey, item);
			}
		}
	};
	mrapp.data = function(options){
		return new DataSource(options);
	};
    return DataSource;
});