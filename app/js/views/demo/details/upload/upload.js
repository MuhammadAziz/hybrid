define([
	'text!./upload.html',
	'common/file-browser/file-browser'
], function (html, fileBrowser) {
	var uploadApp = mrapp.view({
		html: html,
		name: 'upload',
		onInit: function (e) {

		},
		getFilesystem: function (success, fail) {
			window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, success, fail);
		},
		getFolder: function (fileSystem, folderName, success, fail) {
			fileSystem.root.getDirectory(folderName, {create: true, exclusive: false}, success, fail);
		},
//		transferFile: function (uri, filePath) {
//			var transfer = new FileTransfer();
//			transfer.download(
//					uri,
//					filePath,
//					function (entry) {
//						var targetPath = entry.toURL();
//						if (device.platform == "Win32NT") {
//							targetPath = entry.fullPath;
//						}
//						var image = document.getElementById("downloadedImage");
//						image.src = targetPath;
//						image.style.display = "block";
//						image.display = targetPath;
//						document.getElementById("result").innerHTML = "File saved to: " + targetPath;
//					},
//					function (error) {
//						document.getElementById("result").innerHTML = "An error has occurred: Code = " + error.code;
//						console.log("download error source " + error.source);
//						console.log("download error target " + error.target);
//						console.log("upload error code" + error.code);
//					}
//			);
//		},
		_getImage: function (callback) {
			var error = function (message) {
				alert('Failed to get a picture');
			};
			var options = {
				quality: 50,
				destinationType: navigator.camera.DestinationType.FILE_URI,
				sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
			};
			navigator.camera.getPicture(callback, error, options);
		},
		_uploadImage: function (fileURI) {
			var options = new FileUploadOptions(),
					serverUri = encodeURI("http://www.filedropper.com");

			options.fileKey = "file";
			options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);

			if (cordova.platformId === "android") {
				options.fileName += ".jpg";
			}

			options.mimeType = "image/jpeg";
			options.params = {}; // if we need to send parameters to the server request 
			options.headers = {
				Connection: "Close"
			};
			options.chunkedMode = false;

			var ft = new FileTransfer();
			ft.upload(
					fileURI,
					serverUri,
					onFileUploadSuccess,
					onFileTransferFail,
					options);

			function onFileUploadSuccess(result) {
//				console.log("FileTransfer.upload");
//				console.log("Code = " + result.responseCode);
//				console.log("Response = " + result.response);
//				console.log("Sent = " + result.bytesSent);
//				console.log("Link to uploaded file: http://www.filedropper.com" + result.response);
				var response = result.response;
				var destination = "http://www.filedropper.com/" + response.substr(response.lastIndexOf('=') + 1);
				document.getElementById("view-upload-result").innerHTML = "File uploaded to: " +
						destination +
						"</br><button onclick=\"window.open('" + destination + "', '_blank', 'location=yes')\">Open Location</button>";
				document.getElementById("view-upload-downloaded").style.display = "none";
			}

			function onFileTransferFail(error) {
				console.log("FileTransfer Error:");
				console.log("Code: " + error.code);
				console.log("Source: " + error.source);
				console.log("Target: " + error.target);
			}
		},
		uploadImage: function (event) {
			var that = this, target = $(event.target), maxUploadSize;
			maxUploadSize = target.length && target.attr("data-max-upload") ? kendo.parseInt(target.attr("data-max-upload")) : null;
			this._getImage(function (fileUri) {
				that._getFileContent(fileUri, function (file) {
					if (maxUploadSize && file.size > maxUploadSize) {
						alert("Maximum file size 1MB");
					} else {
						that._uploadImage(fileUri);
					}
				});
			});
		},
		uploadFile: function (event) {
			var that = this, target = $(event.target), maxUploadSize;
			maxUploadSize = target.length && target.attr("data-max-upload") ? kendo.parseInt(target.attr("data-max-upload")) : null;
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
			function fail() {

			}
			function gotFS(fs) {
				fileBrowser.browse({
					dir: fs.root,
					selectFile: selectFile
				});
			}
			
			function selectFile(result){
				//TODO: change to common path for Androids, iOS, and windows phone
//				var fileUri = "file:\/\/\/storage\/emulated\/0" + result.fullPath;
				that._getFileContent(result.nativeURL, function(file){
					if (maxUploadSize && file.size > maxUploadSize) {
						alert("Maximum file size 1MB");
					} else {
						that._uploadImage(result.nativeURL);
					}
				});
			}
		},
		_getFileContent: function (path, callback) {
			var gotFile = function (fileEntry) {
				fileEntry.file(function (file) {
					callback(file);
				});
			};
			var error = function (er) {
				console.log("error retieving file: " + er);
			};
			window.resolveLocalFileSystemURL(path, gotFile, error);
		}
	});
	return uploadApp;
});