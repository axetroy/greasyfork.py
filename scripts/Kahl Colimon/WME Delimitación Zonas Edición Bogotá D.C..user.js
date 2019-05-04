// ==UserScript==
// @name			WME Delimitación Zonas Edición Bogotá D.C.
// @namespace		https://greasyfork.org/es/users/33476-kahl-colimon
// @description		Delimita zonas de Edición para La Ciudad de Bogotá D.C. Colombia
// @include			/^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor.*$/
// @version			3.0
// @icon            https://lh3.googleusercontent.com/-UlDeMRxZYwk/UIXETEtJHWI/AAAAAAAAAEs/t-xou-N8i9s/w253-h253-p/photo.jpg
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
		fillOpacity: 0.1,
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

	createLayerToggler(document.getElementById('layer-switcher-group_display').parentNode.parentNode, localStorage.MapRaidChinaVisible == "true", 'Delimitación Bogotá', function(checked) {
		localStorage.MapRaidBogotaVisible = checked;
		mapLayer.setVisibility(checked);
	});
	
	mapLayer = new OL.Layer.Vector("Bogota MapRaid Regions", {
		uniqueName: "__BogotaMapRaid"
	});

	addRaidPolygon(mapLayer, [
		[-74.034816,4.8256298],[-74.05725,4.6868491],[-74.0478516,4.684903],[-74.0340328,4.677204],[-74.0302134,4.6751937],[-74.0234327,4.6754075],[-74.0163946,4.6716863],[-74.0107298,4.6643721],[-74.0093994,4.6646716],[-74.0048075,4.6689061],[-74.0023184,4.674766],[-74.0019321,4.6800697],[-74.0048075,4.6837909],[-74.0103436,4.6877687],[-74.012661,4.7005573],[-74.0073395,4.7188631],[-74.0062237,4.7281013],[-74.0078545,4.7542756],[-74.0159225,4.7704416],[-73.9983273,4.805766],[-74.0043354,4.8171413],[-74.010601,4.8215032],[-74.034816,4.8256298]
	], '#FFFF00', 'Zona 8');
	addRaidPolygon(mapLayer, [
		[-74.05725,4.6868491],[-74.034816,4.8256298],[-74.0437317,4.8330492],[-74.0494823,4.8360426],[-74.0626144,4.8362136],[-74.0733433,4.8371544],[-74.0808535,4.8373255],[-74.0873337,4.832536],[-74.0924839,4.8083317],[-74.1134262,4.7907983],[-74.1178894,4.7811332],[-74.1214085,4.7601776],[-74.0964317,4.7467485],[-74.0863037,4.7382803],[-74.0748882,4.7322072],[-74.0748024,4.7217714],[-74.0723133,4.7117633],[-74.0695667,4.6979055],[-74.0654254,4.6891802],[-74.05725,4.6868491]
	], '#A61B4A', 'Zona 7');
	addRaidPolygon(mapLayer, [
		[-74.1035128,4.6537215],[-74.0914214,4.6352002],[-74.08463,4.6322915],[-74.0707791,4.6120799],[-74.0660906,4.6084546],[-74.0640306,4.6033749],[-74.0056014,4.5593133],[-73.9912891,4.5958461],[-73.9912033,4.6177478],[-74.0090561,4.6363979],[-74.0101451,4.6636931],[-74.0163946,4.6716863],[-74.0234327,4.6754075],[-74.0302134,4.6751937],[-74.0478516,4.684903],[-74.05725,4.6868491],[-74.0654254,4.6891802],[-74.0692663,4.6896507],[-74.0729141,4.6887524],[-74.0847588,4.6792143],[-74.0894365,4.671558],[-74.1035128,4.6537215]
	], '#7C3592', 'Zona 6');
	addRaidPolygon(mapLayer, [
		[-74.0654254,4.6891802],[-74.0695667,4.6979055],[-74.0723133,4.7117633],[-74.0748024,4.7217714],[-74.0748882,4.7322072],[-74.0863037,4.7382803],[-74.0964317,4.7467485],[-74.1214085,4.7601776],[-74.1714478,4.7201462],[-74.1228676,4.6837054],[-74.1035128,4.6537215],[-74.0894365,4.671558],[-74.0847588,4.6792143],[-74.0729141,4.6887524],[-74.0692663,4.6896507],[-74.0654254,4.6891802]
	], '#4186F0', 'Zona 5');
    addRaidPolygon(mapLayer, [
		[-74.1290259,4.6092995],[-74.1246271,4.6047865],[-74.1175032,4.6000811],[-74.1134477,4.5963381],[-74.1108513,4.5918464],[-74.1027617,4.58143],[-74.0945005,4.5757405],[-74.0911961,4.5721043],[-74.0318871,4.5374099],[-74.0056014,4.5593133],[-74.0640306,4.6033749],[-74.0660906,4.6084546],[-74.0707791,4.6120799],[-74.08463,4.6322915],[-74.0914214,4.6352002],[-74.1035128,4.6537215],[-74.1086197,4.6468777],[-74.1193163,4.6363444],[-74.1244125,4.6239503],[-74.1290259,4.6092995]
	], '#FFFF00', 'Zona 4');
    addRaidPolygon(mapLayer, [
		[-74.1290259,4.6092995],[-74.1244125,4.6239503],[-74.1193163,4.6363444],[-74.1086197,4.6468777],[-74.1035128,4.6537215],[-74.1228676,4.6837054],[-74.1714478,4.7201462],[-74.1770267,4.7026959],[-74.1858673,4.6583839],[-74.1708899,4.6284845],[-74.1626072,4.6152668],[-74.1493464,4.6176837],[-74.1433811,4.6193733],[-74.1396904,4.61886],[-74.1342402,4.6125505],[-74.1290259,4.6092995]
	], '#A61B4A', 'Zona 3');
    addRaidPolygon(mapLayer, [
		[-74.1382957,4.5949692],[-74.141922,4.5956108],[-74.1466641,4.5949692],[-74.1521788,4.5956322],[-74.15411,4.5964878],[-74.1676712,4.5956322],[-74.1779494,4.5969156],[-74.1832495,4.5967017],[-74.2008018,4.5886167],[-74.0385819,4.5078049],[-74.0318871,4.5374099],[-74.0911961,4.5721043],[-74.0945005,4.5757405],[-74.1027617,4.58143],[-74.1108513,4.5918464],[-74.1134477,4.5963381],[-74.1175032,4.6000811],[-74.1246271,4.6047865],[-74.1290259,4.6092995],[-74.1319871,4.6044229],[-74.1382957,4.5949692]
	], '#4186F0', 'Zona 2');
    addRaidPolygon(mapLayer, [
		[-74.1290259,4.6092995],[-74.1342402,4.6125505],[-74.1396904,4.61886],[-74.1433811,4.6193733],[-74.1493464,4.6176837],[-74.1626072,4.6152668],[-74.1708899,4.6284845],[-74.1858673,4.6583839],[-74.2223454,4.6453806],[-74.2243195,4.6210844],[-74.2008018,4.5886167],[-74.1832495,4.5967017],[-74.1779494,4.5969156],[-74.1676712,4.5956322],[-74.15411,4.5964878],[-74.1521788,4.5956322],[-74.1466641,4.5949692],[-74.141922,4.5956108],[-74.1382957,4.5949692],[-74.1319871,4.6044229],[-74.1290259,4.6092995]
	], '#7C3592', 'Zona 1');

	Waze.map.addLayer(mapLayer);
	mapLayer.setVisibility(localStorage.MapRaidBogotaVisible == "true");
	
	displayCurrentRaidLocation();
	Waze.map.events.register("moveend", null, displayCurrentRaidLocation);
	Waze.map.events.register("zoomend", null, displayCurrentRaidLocation);
}
