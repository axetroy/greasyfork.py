// ==UserScript==
// @name                WME NJ MapRaid 5-24-15 Overlay
// @namespace           https://greasyfork.org/users/5252
// @description         Creates polygons for MapRaid groups in a WME "NJ MapRaid 5-24-15 Groups" layer
// @include             https://www.waze.com/editor/*
// @include             https://www.waze.com/*/editor/*
// @include             https://editor-beta.waze.com/*
// @version             1.8
// @grant               none
// @copyright           2014 davielde
// ==/UserScript==


//---------------------------------------------------------------------------------------


//generated by rickzabel's overlay generator

//RZ RaidName will be replaced by the name of the layer in your KML file
//RZ RaidNameNoSpaces will be replaced by the name of the layer in your KML file
//RZ AreaPoints will be replaced by the names, colors, and area points from your KML file

setTimeout(InitMapRaidOverlay, 1000);

function AddRaidPolygon(raidLayer,groupPoints,groupColor,groupNumber){
    
    var mro_Map = Waze.map;
    var mro_OL = OpenLayers;
    var raidGroupLabel = 'Raid Group ' + groupNumber;
    var groupName = 'RaidGroup' + groupNumber;
    
    var style = {
        strokeColor: groupColor,
        strokeOpacity: .8,
        strokeWidth: 3,
        fillColor: groupColor,
        fillOpacity: 0.15,
        label: raidGroupLabel,
        labelOutlineColor: "black",
        labelOutlineWidth: 3,
        fontSize: 14,
        fontColor: groupColor,
        fontOpacity: .85,
        fontWeight: "bold"  
    };
    
    var attributes = {
        name: groupName,
        number: groupNumber
    };
    
    var pnt= [];
    for(i=0;i<groupPoints.length;i++){
        convPoint = new OpenLayers.Geometry.Point(groupPoints[i].lon,groupPoints[i].lat).transform(new OpenLayers.Projection("EPSG:4326"), mro_Map.getProjectionObject());
        //console.log('MapRaid: ' + JSON.stringify(groupPoints[i]) + ', ' + groupPoints[i].lon + ', ' + groupPoints[i].lat);
        pnt.push(convPoint);
    }
		       
    var ring = new mro_OL.Geometry.LinearRing(pnt);
    var polygon = new mro_OL.Geometry.Polygon([ring]);
    
    var feature = new mro_OL.Feature.Vector(polygon,attributes,style);
    raidLayer.addFeatures([feature]);

}

function CurrentRaidLocation(raid_mapLayer){
    var mro_Map = Waze.map;

    for(i=0;i<raid_mapLayer.features.length;i++){
        var raidMapCenter = mro_Map.getCenter();
        var raidCenterPoint = new OpenLayers.Geometry.Point(raidMapCenter.lon,raidMapCenter.lat);
        var raidCenterCheck = raid_mapLayer.features[i].geometry.components[0].containsPoint(raidCenterPoint);
        //console.log('MapRaid: ' + raid_mapLayer.features[i].attributes.number + ': ' + raidCenterCheck);
        if(raidCenterCheck === true){
        	var raidLocationLabel = 'Raid Group ' + raid_mapLayer.features[i].attributes.number + ' - ' + $('.WazeControlLocationInfo').text();
    		//setTimeout(function(){$('.WazeControlLocationInfo').text(raidLocationLabel);},200);
			setTimeout(function(){$('.WazeControlLocationInfo').text(raidLocationLabel);},50);
			var str = $('.WazeControlLocationInfo').text();
			
			var n2 = str.indexOf(" - ");
			
			if(n2 > 0){
				var n = str.length;
				var res = str.substring(n2+2, n);
				var rescount = res.indexOf(" - ");
				if(rescount>0){
					var n3 = res.length;
					var res2 = res.substring(rescount+2, n3);
						
				}
				var raidLocationLabel = 'Raid Group ' + raid_mapLayer.features[i].attributes.number + ' - ' + res2;
			} else {
				var raidLocationLabel = 'Raid Group ' + raid_mapLayer.features[i].attributes.number + ' - ' + $('.WazeControlLocationInfo').text();
			}	
    		setTimeout(function(){$('.WazeControlLocationInfo').text(raidLocationLabel);},200);
		}
    }
}

function InitMapRaidOverlay(){

    var mro_Map = Waze.map;
    var mro_OL = OpenLayers;

    //if (!mro_Map) return;
	
    //if (!mro_OL) return;

    var mro_mapLayers = mro_Map.getLayersBy("uniqueName","__NJMapRaid5-24-15");
        
    var raid_mapLayer = new mro_OL.Layer.Vector("NJ MapRaid 5-24-15", {
        displayInLayerSwitcher: true,
        uniqueName: "__NJMapRaid5-24-15"
    });
        
    I18n.translations.en.layers.name["__NJMapRaid5-24-15"] = "NJ MapRaid 5-24-15";
    mro_Map.addLayer(raid_mapLayer);
    raid_mapLayer.setVisibility(true);
    

var V01BayShore = [{lon:'-74.090424',lat:'40.489520999999996'},{lon:'-74.301996',lat:'40.50707800000001'},{lon:'-74.310822',lat:'40.35752200000001'},{lon:'-74.08129',lat:'40.353798'},{lon:'-74.016554',lat:'40.382333'},{lon:'-73.968115',lat:'40.37917800000001'},{lon:'-73.961849',lat:'40.478815000000004'},{lon:'-74.090424',lat:'40.489520999999996'}];
AddRaidPolygon(raid_mapLayer, V01BayShore,"#0BA9CC","01-Bay Shore");

var V02RedBank = [{lon:'-74.310822',lat:'40.35752200000002'},{lon:'-74.31306700000002',lat:'40.31926599999999'},{lon:'-74.28756',lat:'40.244579'},{lon:'-73.978607',lat:'40.277937'},{lon:'-73.972664',lat:'40.306629'},{lon:'-73.968115',lat:'40.37917800000002'},{lon:'-74.016554',lat:'40.382333'},{lon:'-74.08129',lat:'40.353798'},{lon:'-74.310822',lat:'40.35752200000002'}];
AddRaidPolygon(raid_mapLayer, V02RedBank,"#7C3592","02-Red Bank");

var V03AsburyPark = [{lon:'-74.28756',lat:'40.244579'},{lon:'-74.26054',lat:'40.16523200000001'},{lon:'-74.002361',lat:'40.168692'},{lon:'-73.978607',lat:'40.277937'},{lon:'-74.28756',lat:'40.244579'}];
AddRaidPolygon(raid_mapLayer, V03AsburyPark,"#0BA9CC","03-Asbury Park");

var V04PtPleasant = [{lon:'-74.26054',lat:'40.16523200000001'},{lon:'-74.247953',lat:'40.128485'},{lon:'-74.235434',lat:'40.040501'},{lon:'-74.026048',lat:'40.05745199999999'},{lon:'-74.002361',lat:'40.168692'},{lon:'-74.26054',lat:'40.16523200000001'}];
AddRaidPolygon(raid_mapLayer, V04PtPleasant,"#7C3592","04-Pt Pleasant");

var V05TomsRiver = [{lon:'-74.235434',lat:'40.040501'},{lon:'-74.226952',lat:'39.980774'},{lon:'-74.254532',lat:'39.908946'},{lon:'-74.060898',lat:'39.892353'},{lon:'-74.026048',lat:'40.05745199999999'},{lon:'-74.235434',lat:'40.040501'}];
AddRaidPolygon(raid_mapLayer, V05TomsRiver,"#0BA9CC","05-Toms River");

var V06LongBeachIsland = [{lon:'-74.254532',lat:'39.908946'},{lon:'-74.313222',lat:'39.755221'},{lon:'-74.497604',lat:'39.58717'},{lon:'-74.283199',lat:'39.488277'},{lon:'-74.088707',lat:'39.763949999999994'},{lon:'-74.060898',lat:'39.892353'},{lon:'-74.254532',lat:'39.908946'}];
AddRaidPolygon(raid_mapLayer, V06LongBeachIsland,"#7C3592","06-Long Beach Island");

var V07AtlanticCity = [{lon:'-74.497604',lat:'39.58717'},{lon:'-74.707203',lat:'39.33881199999999'},{lon:'-74.620015',lat:'39.300314'},{lon:'-74.471855',lat:'39.29232899999999'},{lon:'-74.319076',lat:'39.436988'},{lon:'-74.283199',lat:'39.488277'},{lon:'-74.497604',lat:'39.58717'}];
AddRaidPolygon(raid_mapLayer, V07AtlanticCity,"#0BA9CC","07-Atlantic City");

var V08OceanCity = [{lon:'-74.863586',lat:'39.152028'},{lon:'-74.66506',lat:'39.108285'},{lon:'-74.471855',lat:'39.29232899999999'},{lon:'-74.620015',lat:'39.300314'},{lon:'-74.707203',lat:'39.33881199999999'},{lon:'-74.863586',lat:'39.152028'}];
AddRaidPolygon(raid_mapLayer, V08OceanCity,"#7C3592","08-Ocean City");

var V09CapeMay = [{lon:'-75.035591',lat:'38.945258'},{lon:'-74.875946',lat:'38.905996'},{lon:'-74.66506',lat:'39.108285'},{lon:'-74.863586',lat:'39.152028'},{lon:'-75.035591',lat:'38.945258'}];
AddRaidPolygon(raid_mapLayer, V09CapeMay,"#0BA9CC","09-Cape May");


    
	
    setTimeout(function(){CurrentRaidLocation(raid_mapLayer);},3000);
    mro_Map.events.register("moveend", Waze.map, function(){CurrentRaidLocation(raid_mapLayer);});
    mro_Map.events.register("zoomend", Waze.map, function(){CurrentRaidLocation(raid_mapLayer);});
       
}