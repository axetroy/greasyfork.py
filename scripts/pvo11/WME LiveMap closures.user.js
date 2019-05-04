// ==UserScript==
// @name				WME LiveMap closures
// @description 		Shows road closures from Waze Live map in WME
// @include 			https://www.waze.com/editor*
// @include 			https://www.waze.com/*/editor*
// @include 			https://beta.waze.com/*
// @exclude				https://www.waze.com/*user/editor*
// @version 			1.15.2
// @copyright			2014-2018, pvo11
// @namespace			https://greasyfork.org/scripts/5144-wme-road-closures
// ==/UserScript==


var epsg900913;
var epsg4326;
var closuresLayer;

var uOpenLayers;
var uWaze;

var lineWidth = [
	[4, 5],
	[5, 6],
	[6, 7],
	[7, 8],
	[8, 9],
	[10, 12],
	[12, 14],
	[14, 16],
	[15, 17],
	[16, 18],
	[17, 19]
];
	

function drawLine(line) {
	var linePoints = [];

	var zoom = uWaze.map.getZoom();
	if (zoom >= lineWidth.length) {
		zoom = lineWidth.length - 1;
	}

	var p = new uOpenLayers.Geometry.Point(line[0].x, line[0].y).transform(epsg4326, epsg900913);
	linePoints.push(p);
	for(var i = 1; i < line.length-1; i++) {
		var lp1 = line[i];
		var lp2 = line[i + 1];
		
		var dif_lon = Math.abs(lp1.x - lp2.x);
		var dif_lat = Math.abs(lp1.y - lp2.y);
		
		if (dif_lon < 0.0000001 && dif_lat < 0.0000001) continue;
		p = new uOpenLayers.Geometry.Point(lp1.x, lp1.y).transform(epsg4326, epsg900913);
		linePoints.push(p);
	}
	p = new uOpenLayers.Geometry.Point(line[line.length-1].x, line[line.length-1].y).transform(epsg4326, epsg900913);
	linePoints.push(p);
	var lineString = new uOpenLayers.Geometry.LineString(linePoints);
	var lineFeature = new uOpenLayers.Feature.Vector(lineString, null, { strokeColor: '#000000', strokeDashstyle: 'solid', strokeLinecap: 'round', strokeWidth: lineWidth[zoom][1]} );
	closuresLayer.addFeatures(lineFeature);
	lineString = new uOpenLayers.Geometry.LineString(linePoints);
	lineFeature = new uOpenLayers.Feature.Vector(lineString, null, { strokeColor: '#FF0000', strokeDashstyle: 'solid', strokeLinecap: 'round', strokeWidth: lineWidth[zoom][0] } );
	closuresLayer.addFeatures(lineFeature);
	lineString = new uOpenLayers.Geometry.LineString(linePoints);
	lineFeature = new uOpenLayers.Feature.Vector(lineString, null, { strokeColor: '#FFFFFF', strokeDashstyle: 'dot', strokeLinecap: 'square', strokeWidth: lineWidth[zoom][0] } );
	closuresLayer.addFeatures(lineFeature);
}


function getRoutingURL(){
	var server;
	if (typeof (uWaze.location) === 'undefined') {
		server = uWaze.app.getAppRegionCode();
	} else {
		server = uWaze.location.code;
	}
	var routingURL = 'https://www.waze.com';
	if (~document.URL.indexOf('https://beta.waze.com')) {
        routingURL = 'https://beta.waze.com';
    }
	
	switch(server){
		case 'usa':
			routingURL += '/rtserver/web/TGeoRSS';
			break;
		case 'row':
			routingURL += '/row-rtserver/web/TGeoRSS'; 
			break;
		case 'il':
		  	routingURL += '/il-rtserver/web/TGeoRSS'; 
			break;
		default: 
			routingURL += '/rtserver/web/TGeoRSS';
	}  

	return routingURL;
}


function requestClosures()
{
	if (closuresLayer.getVisibility()) {
		var extent = uWaze.map.getExtent();
		var oh = 500;
		var pLB = new uOpenLayers.Geometry.Point(extent.left - oh, extent.bottom - oh).transform(epsg900913, epsg4326);
		var pRT = new uOpenLayers.Geometry.Point(extent.right + oh, extent.top + oh).transform(epsg900913, epsg4326);
		var data = {
			ma: "600",
			mj: "100",
			mu: "100",
			types: "traffic",
			left: pLB.x,
			right: pRT.x,
			bottom: pLB.y,
			top: pRT.y
		};
		var url = getRoutingURL();

		$.ajax({
				dataType: "json",
				url: url,
				data: data,
				success: function(json) {
					if (json.error != undefined) {
					} else {
						closuresLayer.destroyFeatures();
						var ids = [];
						if ("undefined" !== typeof(json.jams)) {
							var numjams = json.jams.length;
							for (var i = 0; i < numjams; i++) {
								var jam = json.jams[i];
								if (jam.blockType === "ROAD_CLOSED_EVENT" || jam.blockType === "ROAD_CLOSED_CONSTRUCTION" || (typeof(jam.causeAlert) !== "undefined" && jam.causeAlert.subtype === "ROAD_CLOSED_EVENT")) {
									if (typeof(ids[jam.segments[0].ID]) === "undefined") {
										drawLine(jam.line);
										ids[jam.segments[0].ID] = 1;
									}
								}
							} 
						}
					}
			}
		});
	}
}


function changeLayer()
{
	localStorage.DrawLiveMapClosures = closuresLayer.getVisibility();
	requestClosures();
}


function liveMapClosures_init()
{
	closuresLayer = new uOpenLayers.Layer.Vector("LiveMap closures", {
			displayInLayerSwitcher: true,
			uniqueName: "__DrawLiveMapClosures"
		});
	uWaze.map.addLayer(closuresLayer);
	if (localStorage.DrawLiveMapClosures) {
		closuresLayer.setVisibility(localStorage.DrawLiveMapClosures == "true");
	} else {
		closuresLayer.setVisibility(true);
	}
	var roadGroupSelector = document.getElementById('layer-switcher-group_road');
	if (roadGroupSelector != null) {
		var roadGroup = roadGroupSelector.parentNode.parentNode.querySelector('.children');
		var toggler = document.createElement('li');
		var togglerContainer = document.createElement('div');
		togglerContainer.className = 'controls-container toggler';
		var checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.id = 'layer-switcher-item_livemap_closures';
		checkbox.className = 'toggle';
		checkbox.checked = closuresLayer.getVisibility();
		checkbox.addEventListener('click', function(e) {
			closuresLayer.setVisibility(e.target.checked);
		});
		roadGroupSelector.addEventListener('click', function(e) {
			closuresLayer.setVisibility(e.target.checked & checkbox.checked);
			checkbox.disabled = !e.target.checked;
		});
		togglerContainer.appendChild(checkbox);
		var label = document.createElement('label');
		label.htmlFor = checkbox.id;
		var labelText = document.createElement('span');
		labelText.className = 'label-text';
		labelText.appendChild(document.createTextNode('LiveMap closures'));
		label.appendChild(labelText);
		togglerContainer.appendChild(label);
		toggler.appendChild(togglerContainer);
		roadGroup.appendChild(toggler);
	}

	var alertsLayer = uWaze.map.getLayerByUniqueName('__livemap_alerts');
	if (typeof(alertsLayer) !== "undefined") {
		var closuresLayerZIdx = closuresLayer.getZIndex();
			var alertsLayerZIdx = alertsLayer.getZIndex();
		if (closuresLayerZIdx > alertsLayerZIdx) {
			closuresLayer.setZIndex(alertsLayerZIdx);
			alertsLayer.setZIndex(closuresLayerZIdx);
		}
	}

	uWaze.map.events.register("zoomend", null, requestClosures);
	uWaze.map.events.register("moveend", null, requestClosures);
	uWaze.map.events.register("changelayer", null, changeLayer);
	requestClosures();

}


function liveMapClosures_bootstrap()
{
	uWaze = unsafeWindow.W;
	uOpenLayers = unsafeWindow.OL;
	
	if (typeof(uOpenLayers) === 'undefined' || typeof (uWaze) === 'undefined' || typeof (uWaze.map) === 'undefined' || document.querySelector('.list-unstyled.togglers .group') === null) {
		setTimeout(liveMapClosures_bootstrap, 500);
	} else {
		epsg900913 = new uOpenLayers.Projection("EPSG:900913");
		epsg4326 = new uOpenLayers.Projection("EPSG:4326");
		liveMapClosures_init();
	}
}


liveMapClosures_bootstrap();
