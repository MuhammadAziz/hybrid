define([
	'text!./camera.html'
], function (html) {
	var cameraApp = mrapp.view({
		html: html,
		name: 'camera',
		onInit: function(e){
			cameraApp._pictureSource = navigator.camera.PictureSourceType;
			cameraApp._destinationType = navigator.camera.DestinationType;
			cameraApp._target = document.getElementById('view-camera-result');
		},
		_pictureSource: null,
		_destinationType: null,
		getPhoto: function(e){
			this._capturePhoto(e);
		},
		getPhotoEdit: function(e){
			this._capturePhotoEdit(e);
		},
		/*
		getPhotoLibrary: function(e){
			this._getPhotoFromLibrary(e);
		},
		getPhotoAlbum: function(e){
			this._getPhotoFromAlbum(e);
		},
		*/
		_capturePhoto: function () {
			var that = this;

			// Take picture using device camera and retrieve image as base64-encoded string.
			navigator.camera.getPicture(function () {
				that._onPhotoDataSuccess.apply(that, arguments);
			}, function () {
				that._onFail.apply(that, arguments);
			}, {
				quality: 50,
				destinationType: that._destinationType.DATA_URL
			});
		},
		_capturePhotoEdit: function () {
			var that = this;
			// Take picture using device camera, allow edit, and retrieve image as base64-encoded string. 
			// The allowEdit property has no effect on Android devices.
			navigator.camera.getPicture(function () {
				that._onPhotoDataSuccess.apply(that, arguments);
			}, function () {
				that._onFail.apply(that, arguments);
			}, {
				quality: 20, allowEdit: true,
				destinationType: cameraApp._destinationType.DATA_URL
			});
		},
		_getPhotoFromLibrary: function () {
			var that = this;
			// On Android devices, pictureSource.PHOTOLIBRARY and
			// pictureSource.SAVEDPHOTOALBUM display the same photo album.
			that._getPhoto(that._pictureSource.PHOTOLIBRARY);
		},
		_getPhotoFromAlbum: function () {
			var that = this;
			// On Android devices, pictureSource.PHOTOLIBRARY and
			// pictureSource.SAVEDPHOTOALBUM display the same photo album.
			that._getPhoto(that._pictureSource.SAVEDPHOTOALBUM);
		},
		_getPhoto: function (source) {
			var that = this;
			// Retrieve image file location from specified source.
			navigator.camera.getPicture(function () {
				that._onPhotoURISuccess.apply(that, arguments);
			}, function () {
				cameraApp._onFail.apply(that, arguments);
			}, {
				quality: 50,
				destinationType: cameraApp._destinationType.FILE_URI,
				sourceType: source
			});
		},
		_onPhotoDataSuccess: function (imageData) {
			this._target.style.display = 'block';

			// Show the captured photo.
			var bytes = (imageData.length - 814) / 1.37;
			console.log(bytes);
			this._target.src = "data:image/jpeg;base64," + imageData;
		},
		_onPhotoURISuccess: function (imageURI) {
			this._target.style.display = 'block';

			// Show the captured photo.
			this._target.src = imageURI;
		},
		_onFail: function (message) {
			alert(message);
		}
	});

	return cameraApp.newInstance;
});