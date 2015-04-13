define([
	'text!./geolocation.html'
], function (html) {
	var map = null, _mapCanvas;
	var geolocation = mrapp.view({
		html: html,
		name: 'geolocation',
		onInit: function (e) {
			var view = e.view.element;
			_mapCanvas = view.find("#view-geolocation-map-canvas")[0];
		},
		onAfterShow: function (e) {
			geolocation.initMaps();
		},
		initMaps: function () {
			var that = this;
			map = plugin.google.maps.Map.getMap();
			map.addEventListener(plugin.google.maps.event.MAP_READY, function () {
				map.setDiv(_mapCanvas);
			});
		},
		view: {
			isShowMapOptions: false,
			isShowPanBy: false,
			isShowToggleMap: false,
			isShowMarker: false,
			isShowCustomMarker: false,
			isShowHtmlOverlay: false,
			isShowGeocoding: false,
			isShowReverseGeocoding: false
		},
		formData: {
			address: "Denpasar",
			options: {
				compass: true,
				myLocationButton: true,
				indoorPicker: false,
				zoom: false
			}
		},
		gotoAsterx: function (e) {
			this._resetMap();
			//asterx coordinate
			var location = new plugin.google.maps.LatLng(-33.8313809, 151.2440245);
			//zoom out
			map.moveCamera({
				'target': location,
				'zoom': 0
			}, function () {
				//zoom in to target
				setTimeout(function () {
					map.addMarker({
						'position': location,
						'title': "AsteRx"
					}, function (marker) {
						map.animateCamera({
							'target': location,
							'tilt': 60,
							'zoom': 18,
							'bearing': 140
						}, function () {
							marker.showInfoWindow();
						});
					});
				}, 1000);

			});
		},
		_resetMap: function () {
			map && (map.clear(), map.off());
			this._resetView();
		},
		_resetView: function () {
			this.set("view", {
				isShowMapOptions: false,
				isShowPanBy: false,
				isShowToggleMap: false,
				isShowMarker: false,
				isShowCustomMarker: false,
				isShowHtmlOverlay: false,
				isShowGeocoding: false,
				isShowReverseGeocoding: false
			});
		},
		showCurrentLocation: function () {
			this._resetMap();
			var success = function (location) {
				map.addMarker({
					'position': location.latLng,
					'title': "I am here!"
				}, function (marker) {
					map.animateCamera({
						'target': location.latLng,
						'zoom': 18
					}, function () {
						marker.showInfoWindow();
					});
				});
			};

			var error = function (result) {
				alert("ERROR\n---\n" + result.error_message);
			};
			map.getMyLocation({
				enableHighAccuracy: true
			}, success, error);
		},
		showMapOptions: function (e) {
			this._resetMap();
			this.set("view.isShowMapOptions", true);
			var GOOGLE = new plugin.google.maps.LatLng(37.422848, -122.085565);
			map.moveCamera({
				'target': GOOGLE,
				'tilt': 60,
				'zoom': 18,
				'bearing': 140
			});

		},
		updateOptions: function () {
			var formOptions = this.formData.options;
			var options = {
				controls: formOptions
			};
			map.setOptions(options);
		},
		showPanBy: function () {
			this._resetMap();
			this.set("view.isShowPanBy", true);
		},
		showToggleMap: function () {
			this._resetMap();
			this.set("view.isShowToggleMap", true);
			if (map) {
				map.remove();
				map = null;
			} else {
				map = plugin.google.maps.Map.getMap(_mapCanvas);
			}
		},
		showMarker: function () {
			this._resetMap();
			this.set("view.isShowMarker", true);
		},
		showCustomMarker: function () {
			this._resetMap();
			this.set("view.isShowCustomMarker", true);
		},
		showHtmlOverlay: function () {
			if (this.view.isShowHtmlOverlay) {
				this.set("view.isShowHtmlOverlay", false);
			} else {
				this._resetMap();
				this.set("view.isShowHtmlOverlay", true);
			}
		},
		showKml: function () {
			this._resetMap();
			map.setZoom(0);
			//Load the kml file
			map.addKmlOverlay({
				url: "js/views/demo-details/geolocation/marker.kml",
				preserveViewport: false,
				animation: true
			}, function (kmlLayer) {
				kmlLayer.on(plugin.google.maps.event.OVERLAY_CLICK, function (overlay, latLng) {
					switch (overlay.type) {
						case "Marker":
							overlay.setSnippet("Marker clicked!");
							overlay.showInfoWindow();
							break;
						case "Polygon":
							overlay.setFillColor("red");
							break;
						case "Polyline":
							var width = overlay.getWidth();
							overlay.setWidth(10);
							setTimeout(function () {
								overlay.setWidth(width);
							}, 3000);
							break;
					}

				});
			});
		},
		showGeocoding: function () {
			this._resetMap();
			this.set("view.isShowGeocoding", true);
		},
		findLocation: function () {
			var that = this;
			if (!that.formData.address) {
				return;
			}
			var request = {
				'address': that.formData.address
			};
			map.geocode(request, function (results) {
				console.log(results);
				if (results.length) {
					var result = results[0];
					var position = result.position;

					var address = [
						result.subThoroughfare || "",
						result.thoroughfare || "",
						result.locality || "",
						result.subAdminArea || "",
						result.adminArea || "",
						result.postalCode || "",
						result.country || ""].join(" ");
					map.addMarker({
						'position': position,
						'title': address
					}, function (marker) {

						map.animateCamera({
							'target': position,
							'zoom': 17
						}, function () {
							marker.showInfoWindow();
						});

					});
				} else {
					alert("Not found");
				}
			});
		},
		showReverseGeocoding: function () {
			var that = this;
			that._resetMap();
			that.set("view.isShowReverseGeocoding", true);
			var asterxLocation = new plugin.google.maps.LatLng(-33.8313809, 151.2440245);
			map.moveCamera({
				'target': asterxLocation,
				'zoom': 7
			});

			map.addMarker({
				'position': asterxLocation,
				'draggable': true,
				'title': 'Drag me!'
			}, function (marker) {
				marker.showInfoWindow();

				marker.on(plugin.google.maps.event.MARKER_DRAG_START, function (marker) {
					marker.hideInfoWindow();
				});

				marker.on(plugin.google.maps.event.MARKER_DRAG_END, function (marker) {
					marker.getPosition(function (latLng) {
						that._reverseGeocoding(map, marker, latLng);
					});
				});
			});
		},
		_reverseGeocoding: function (map, marker, latLng) {
			var request = {
				'position': latLng
			};
			map.geocode(request, function (results) {
				if (results.length) {
					var result = results[0];
					var address = [
						result.subThoroughfare || "",
						result.thoroughfare || "",
						result.locality || "",
						result.adminArea || "",
						result.postalCode || "",
						result.country || ""].join(" ");

					marker.setTitle(address);
					marker.setPosition(result.position);
					marker.showInfoWindow();
				} else {
					alert("Not found");
				}
			});
		}
	});

	return geolocation;
});