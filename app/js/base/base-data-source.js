define(['utils/settings'], function(settings){
    var mrapp = window.mrapp = window.mrapp || {};
    var connectMessage = "Connected to MediRecords, perform synchronize data";
    var disconnectMessage = "Disconnected from MediRecords, data will be synchronize when online";
	var DataSource = kendo.data.DataSource.extend({
		init: function(element, options){
			var that = this;
			if(element && element.offline){
				module.offlineKey = element.offline;
				element.offlineStorage = module;
			}
			kendo.data.DataSource.fn.init.call(that, element, options);
			
			document.addEventListener("online", function(){
				if(settings.isSetupComplete()){
					window.plugins.toast.showShortBottom(element.connect || connectMessage);
					that.online(true);
				}
			}, false);
			
			document.addEventListener("offline", function(){
				if(settings.isSetupComplete()){
					window.plugins.toast.showShortBottom(element.disconnect || disconnectMessage);
					that.online(false);
				}
			}, false);
		}
	}),
	module = {
		offlineKey: null,
		getItem: function(){
			return localStorage.getItem(this.offlineKey);
		},
		setItem: function(item){
			return localStorage.setItem(this.offlineKey, item);
		}
	};
	mrapp.data = function(options){
		return new DataSource(options);
	};
    return DataSource;
});