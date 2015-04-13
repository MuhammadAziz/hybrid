define([
	'text!./file-browser.html'
], function (html) {

	var view, modalView, currentDir, parentDir, option;

	var model = mrapp.view({
		html: html,
		name: 'FileBrowser',
		text: null,
		onInit: function (e) {
			modalView = e.sender;
		},
		fileDatasource: new kendo.data.DataSource({data: []}),
		open: function (e) {
			modalView.open(e);
		},
		formData: {
			content: null
		},
		close: function (e) {
			modalView.close();
			option = null;
		},
		selectFile: function (event) {
			var data = event.data;
			if (data.isFile) {
				typeof option.selectFile === 'function' && option.selectFile(data);
				this.close(event);
			}
			// else{
//				$.extend(parentDir, currentDir);
//				currentDir = data;
//				this._readDir();
			// }
		},
		browse: function (options) {
			var dir = options.dir, that = this;
			option = options;
			if (!dir.isDirectory) {
				console.log('listDir incorrect type');
				return;
			} else {
				currentDir = dir;
				dir.getParent(function (parent) {
					parentDir = parent;
					// if ((parentDir.name === 'sdcard' && currentDir.name !== 'sdcard') || parentDir.name !== 'sdcard') {
					// 	//TODO: show back button
					// }
					that._readDir();
				}, function (error) {
					console.log('Get parent error: ' + error.code);
				});
				
			}
		},
		_readDir: function () {
			var directoryReader = currentDir.createReader(), that = this;
			directoryReader.readEntries(function (entries) {
				var t = entries.length;
				for (var i = 0; i < t; i++) {
					delete entries[i].filesystem;
				}
				that.fileDatasource.data(entries);
				modalView.open();
			});
		},
		_showDir: function () {
			
		}
	});

	return model;

});