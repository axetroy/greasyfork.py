// ==UserScript==
// @name			WME MapRaid Regions Pennsylvania
// @author          Tom 'Glodenox' Puttemans
// @namespace		http://tomputtemans.com
// @description		Shows the regions in the Pennsylvania map raid
// @include			/^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @version			1.5
// @grant			none
// @copyright		2017 Glodenox, based on work by 2015 rickzabel, based on work by 2014 davielde
// ==/UserScript==
setTimeout(initMapRaidOverlay, 1000);
var mapLayer,
	displayedArea = false;

function convertPoints(list) {
	return list.map(function(point) {
		return new OL.Geometry.Point(point[0], point[1]).transform(new OL.Projection("EPSG:4326"), Waze.map.getProjectionObject());
	});
}

function addRaidPolygon(raidLayer, groupPoints, color, name) {
	var style = {
		strokeColor: "Pink",
		strokeOpacity: 0.8,
		strokeWidth: 3,
		fillColor: '#FFFFFF', // Doesn't matter, opacity is set to 0
		fillOpacity: 0,
		label: name,
		labelOutlineColor: "Black",
		labelOutlineWidth: 3,
		fontSize: 14,
		fontColor: "Pink",
		fontOpacity: 0.85,
		fontWeight: "bold"
	};

	var ring = new OL.Geometry.LinearRing(convertPoints(groupPoints));
	var polygon = new OL.Geometry.Polygon([ ring ]);

	var feature = new OL.Feature.Vector(polygon, { name: name }, style);
	raidLayer.addFeatures([ feature ]);
}

function createLayerToggler(parentGroup, checked, name, toggleCallback) {
	var normalizedName = name.toLowerCase().replace(/\s/g, '');
	var group = document.createElement('li');
	var groupToggler = document.createElement('div');
	groupToggler.className = 'controls-container toggler';
	var groupSwitch = document.createElement('input');
	groupSwitch.id = 'layer-switcher-group_' + normalizedName;
	groupSwitch.className = 'layer-switcher-group_' + normalizedName + ' toggle';
	groupSwitch.type = 'checkbox';
	groupSwitch.checked = checked;
	groupSwitch.addEventListener('click', function() { toggleCallback(groupSwitch.checked); });
	groupToggler.appendChild(groupSwitch);
	var groupLabel = document.createElement('label');
	groupLabel.htmlFor = groupSwitch.id;
	groupLabel.style.display = 'block';
	var groupLabelText = document.createElement('div');
	groupLabelText.className = 'label-text';
	groupLabelText.style.textOverflow = 'ellipsis';
	groupLabelText.style.overflowX = 'hidden';
	groupLabelText.appendChild(document.createTextNode(name));
	groupLabel.appendChild(groupLabelText);
	groupToggler.appendChild(groupLabel);
	group.appendChild(groupToggler);
	if (parentGroup !== null) {
		parentGroup.querySelector('input.toggle').addEventListener('click', function(e) {
			groupSwitch.disabled = !e.target.checked;
			if (toggleCallback) {
				toggleCallback(groupSwitch.checked && e.target.checked);
			}
		});
		parentGroup.querySelector('ul.children').appendChild(group);
	} else {
		group.className = 'group';
		groupToggler.classList.add('main');
		var groupChildren = document.createElement('ul');
		groupChildren.className = 'children';
		group.appendChild(groupChildren);
		document.querySelector('.list-unstyled.togglers').appendChild(group);
	}
	return group;
}

function displayCurrentRaidLocation() {
	var raidMapCenter = Waze.map.getCenter();
	var raidCenterPoint = new OL.Geometry.Point(raidMapCenter.lon, raidMapCenter.lat);
	var locationDiv = document.querySelector('#topbar-container > div > div > div.location-info-region > div');
	var mapRaidDiv = locationDiv.querySelector('strong');
	if (mapRaidDiv === null) {
		mapRaidDiv = document.createElement('strong');
		mapRaidDiv.style.marginLeft = '5px';
		locationDiv.appendChild(mapRaidDiv);
	}

	for (i = 0; i < mapLayer.features.length; i++) {
		if (mapLayer.features[i].geometry.components[0].containsPoint(raidCenterPoint)) {
			mapRaidDiv.textContent = '[MapRaid Region: ' + mapLayer.features[i].attributes.name + ']';
			displayedArea = true;
			return;
		}
	}
	if (displayedArea) {
		mapRaidDiv.textContent = '';
		displayedArea = false;
	}
}

function initMapRaidOverlay() {
	if (typeof Waze === 'undefined' || typeof Waze.map === 'undefined' || typeof Waze.loginManager === 'undefined' || !document.querySelector('#topbar-container > div > div > div.location-info-region > div') || !document.getElementById('layer-switcher-group_display')) {
		setTimeout(initMapRaidOverlay, 800);
		return;
	}
	if (!Waze.loginManager.user) {
		Waze.loginManager.events.register("login", null, initMapRaidOverlay);
		Waze.loginManager.events.register("loginStatus", null, initMapRaidOverlay);
		if (!Waze.loginManager.user) {
			return;
		}
	}
	
	if (localStorage.MapRaidPennsylvaniaVisible === undefined) {
		localStorage.MapRaidPennsylvaniaVisible = true;
	}

	createLayerToggler(document.getElementById('layer-switcher-group_display').parentNode.parentNode, localStorage.MapRaidPennsylvaniaVisible == "true", 'Map Raid: Pennsylvania', function(checked) {
		localStorage.MapRaidPennsylvaniaVisible = checked;
		mapLayer.setVisibility(checked);
	});
	
	mapLayer = new OL.Layer.Vector("Pennsylvania MapRaid Regions", {
		uniqueName: "__PennsylvaniaMapRaid"
	});

	addRaidPolygon(mapLayer, [
		[-79.7772216796875,42.00440721296356],[-78.4259033203125,42.01665183556825],[-78.4259033203125,40.86783371108954],[-79.7662353515625,40.87198775669741]
	], '#000000', 'Zone 1');
	addRaidPolygon(mapLayer, [
		[-77.0910644531250,42.00440721296356],[-77.0416259765625,40.86367966548167],[-78.4259033203125,40.86783371108954],[-78.4259033203125,42.01665183556825]
	], '#000000', 'Zone 2');
	addRaidPolygon(mapLayer, [
		[-79.7662353515625,40.87198775669741],[-78.4259033203125,40.86783371108954],[-78.4259033203125,39.72408857733370],[-79.7772216796875,39.71563813479633]
	], '#000000', 'Zone 3');
	addRaidPolygon(mapLayer, [
		[-78.4259033203125,40.86783371108954],[-77.0416259765625,40.86367966548167],[-77.0910644531250,39.71563813479633],[-78.4259033203125,39.72408857733370]
	], '#000000', 'Zone 4');

	Waze.map.addLayer(mapLayer);
	mapLayer.setVisibility(localStorage.MapRaidPennsylvaniaVisible == "true");

	var areaJumper = document.getElementById('mapraidDropdown');
	if (!areaJumper) {
		areaJumper = document.createElement('select');
		areaJumper.id = 'mapraidDropdown';
		areaJumper.style.marginTop = '4px';
		areaJumper.style.display = 'block';
		var areaPlaceholder = document.createElement('option');
		areaPlaceholder.textContent = 'Jump to Map Raid area';
		areaJumper.appendChild(areaPlaceholder);
		areaJumper.addEventListener('change', function() {
			Waze.map.setCenter(areaJumper.selectedOptions[0].centroid);
			areaJumper.selectedIndex = 0;
			areaJumper.blur();
		});
	}
	var areaJumperRegion = document.createElement('optgroup');
	areaJumperRegion.label = 'Pennsylvania (Sep 17 - Sep 25, 2017)';
	mapLayer.features.forEach(function(feature) {
		var area = document.createElement('option');
		area.textContent = feature.attributes.name;
		area.centroid = feature.geometry.getCentroid().toLonLat();
		areaJumperRegion.appendChild(area);
	});
	areaJumper.appendChild(areaJumperRegion);

	if (!document.getElementById('mapraidDropdown')) {
		// Deal with new layout
		if (window.getComputedStyle(document.getElementById('edit-buttons').parentNode).display == 'flex') {
			var areaJumperContainer = document.createElement('div');
			areaJumperContainer.style.flexGrow = '1';
			areaJumperContainer.style.paddingTop = '6px';
			areaJumper.style.width = '80%';
			areaJumper.style.margin = '0 auto';
			areaJumperContainer.appendChild(areaJumper);
			document.getElementById('edit-buttons').parentNode.insertBefore(areaJumperContainer, document.getElementById('edit-buttons'));
		} else {
			document.getElementById('edit-buttons').parentNode.insertBefore(areaJumper, document.getElementById('edit-buttons'));
		}
	}

	displayCurrentRaidLocation();
	Waze.map.events.register("moveend", null, displayCurrentRaidLocation);
	Waze.map.events.register("zoomend", null, displayCurrentRaidLocation);
}
