// ==UserScript==
// @name			WME Delimitación Polígonos Visita Papal Bogotá D.C.
// @namespace		https://greasyfork.org/es/users/33476-kahl-colimon
// @description		Delimita zonas exclusión Visita Papal Bogotá 2017
// @include			/^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @version			3.1.
// @grant			none
// @author          Kahl Colimon
// @copyright		2017 Kahlcolimon, based on work by 2015 rickzabel, based on work by 2014 davielde
// ==/UserScript==
setTimeout(initMapRaidOverlay, 1000);
var mapLayer;

function convertPoints(list) {
	return list.map(function(point) {
		return new OL.Geometry.Point(point[0], point[1]).transform(new OL.Projection("EPSG:4326"), Waze.map.getProjectionObject());
	});
}

function addRaidPolygon(raidLayer, groupPoints, color, name) {
	var style = {
		strokeColor: color,
		strokeOpacity: 0.8,
		strokeWidth: 3,
		fillColor: color,
		fillOpacity: 0.4,
		label: name,
		labelOutlineColor: "Black",
		labelOutlineWidth: 3,
		fontSize: 14,
		fontColor: color,
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
			mapRaidDiv.textContent = '[' + mapLayer.features[i].attributes.name + ']';
			return;
		}
	}
	mapRaidDiv.textContent = '';
}

function initMapRaidOverlay() {
	if (typeof Waze === 'undefined' || typeof Waze.map === 'undefined' || !document.querySelector('#topbar-container > div > div > div.location-info-region > div') || !document.getElementById('layer-switcher-group_display')) {
    setTimeout(initMapRaidOverlay, 800);
    return;
  }
	
	if (localStorage.MapRaidBogotaVisible === undefined) {
		localStorage.MapRaidBogotaVisible = true;
	}

	createLayerToggler(document.getElementById('layer-switcher-group_display').parentNode.parentNode, localStorage.MapRaidChinaVisible == "true", 'Polígonos Exclusión Bogotá', function(checked) {
		localStorage.MapRaidBogotaVisible = checked;
		mapLayer.setVisibility(checked);
	});
	
	mapLayer = new OL.Layer.Vector("Bogota MapRaid Regions", {
		uniqueName: "__BogotaMapRaid"
	});

	addRaidPolygon(mapLayer, [
		[-74.069438,4.6228381],[-74.0647173,4.6494869],[-74.0639448,4.6530371],[-74.062314,4.6560313],[-74.0607262,4.6656981],[-74.0675926,4.6740388],[-74.0756178,4.6793426],[-74.0771198,4.6814384],[-74.088707,4.695382],[-74.0895653,4.6952537],[-74.0909815,4.6939278],[-74.0926552,4.6907199],[-74.1035557,4.6754075],[-74.1041565,4.6740388],[-74.1159582,4.6616774],[-74.1143274,4.6598382],[-74.1141129,4.6584266],[-74.1099072,4.6523955],[-74.1083622,4.6514545],[-74.102633,4.6449314],[-74.0908098,4.6278643],[-74.0910459,4.6256613],[-74.0790081,4.6239503],[-74.0783215,4.6245064],[-74.069438,4.6228381]
	], '#4186F0', 'Polígono Extendido');
	addRaidPolygon(mapLayer, [
		[-74.0910459,4.6256613],[-74.0868831,4.625426],[-74.0833855,4.6247416],[-74.0832782,4.6250197],[-74.081862,4.6261532],[-74.0807033,4.6280781],[-74.0801024,4.6299602],[-74.0796733,4.634195],[-74.0779996,4.6583839],[-74.0777421,4.6597098],[-74.0764546,4.6639872],[-74.0771413,4.6647143],[-74.0851235,4.676263],[-74.0866685,4.6785727],[-74.0915394,4.6840475],[-74.0949512,4.6790218],[-74.1008091,4.6707025],[-74.1071391,4.6649282],[-74.1080618,4.664308],[-74.1104865,4.6621907],[-74.1115594,4.6609075],[-74.112525,4.6590469],[-74.1124177,4.6584052],[-74.1100359,4.6548978],[-74.1089416,4.652695],[-74.102633,4.6449314],[-74.0908098,4.6278643],[-74.0910459,4.6256613]
	], '#A61B4A', 'Polígono Simón Bolivar');

	Waze.map.addLayer(mapLayer);
	mapLayer.setVisibility(localStorage.MapRaidBogotaVisible == "true");
	
	displayCurrentRaidLocation();
	Waze.map.events.register("moveend", null, displayCurrentRaidLocation);
	Waze.map.events.register("zoomend", null, displayCurrentRaidLocation);
}