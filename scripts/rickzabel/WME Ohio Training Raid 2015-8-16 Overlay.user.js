// ==UserScript==
// @name                WME Ohio Training Raid 2015-8-16 Overlay
// @namespace           https://greasyfork.org/users/5252
// @description         Creates polygons for MapRaid groups in a WME "Ohio Training Raid 2015-8-16 Groups" layer
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

    var mro_mapLayers = mro_Map.getLayersBy("uniqueName","__OhioTrainingRaid2015-8-16");
        
    var raid_mapLayer = new mro_OL.Layer.Vector("Ohio Training Raid 2015-8-16", {
        displayInLayerSwitcher: true,
        uniqueName: "__OhioTrainingRaid2015-8-16"
    });
        
    I18n.translations.en.layers.name["__OhioTrainingRaid2015-8-16"] = "Ohio Training Raid 2015-8-16";
    mro_Map.addLayer(raid_mapLayer);
    raid_mapLayer.setVisibility(true);
    

var VArea1 = [{lon:'-82.501498',lat:'40.217818'},{lon:'-82.494632',lat:'39.710482'},{lon:'-82.430592',lat:'39.709168'},{lon:'-82.432823',lat:'40.218995'},{lon:'-82.501498',lat:'40.217818'}];
AddRaidPolygon(raid_mapLayer, VArea1,"#A61B4A","Area 1");

var VArea2 = [{lon:'-82.368107',lat:'40.218471'},{lon:'-82.432823',lat:'40.218995'},{lon:'-82.430592',lat:'39.709168'},{lon:'-82.367592',lat:'39.708904'},{lon:'-82.368107',lat:'40.218471'}];
AddRaidPolygon(raid_mapLayer, VArea2,"#0BA9CC","Area 2");

var VArea3 = [{lon:'-82.30115',lat:'40.218944'},{lon:'-82.368107',lat:'40.218471'},{lon:'-82.367592',lat:'39.708904'},{lon:'-82.304926',lat:'39.709092'},{lon:'-82.30115',lat:'40.218944'}];
AddRaidPolygon(raid_mapLayer, VArea3,"#A61B4A","Area 3");

var VArea4 = [{lon:'-82.30115',lat:'40.218944'},{lon:'-82.304926',lat:'39.709092'},{lon:'-82.239533',lat:'39.708423'},{lon:'-82.234221',lat:'40.218158'},{lon:'-82.30115',lat:'40.218944'}];
AddRaidPolygon(raid_mapLayer, VArea4,"#0BA9CC","Area 4");

var VArea5 = [{lon:'-82.239533',lat:'39.708423'},{lon:'-82.17054',lat:'39.708253'},{lon:'-82.170524',lat:'40.218391'},{lon:'-82.234221',lat:'40.218158'},{lon:'-82.239533',lat:'39.708423'}];
AddRaidPolygon(raid_mapLayer, VArea5,"#A61B4A","Area 5");

var VArea6 = [{lon:'-82.108094',lat:'40.21806300000001'},{lon:'-82.170524',lat:'40.218391'},{lon:'-82.17054',lat:'39.708253'},{lon:'-82.107578',lat:'39.708063'},{lon:'-82.108094',lat:'40.21806300000001'}];
AddRaidPolygon(raid_mapLayer, VArea6,"#0BA9CC","Area 6");

var VArea7 = [{lon:'-82.044',lat:'40.217744'},{lon:'-82.108094',lat:'40.21806300000001'},{lon:'-82.107578',lat:'39.708063'},{lon:'-82.038326',lat:'39.70735299999999'},{lon:'-82.044',lat:'40.217744'}];
AddRaidPolygon(raid_mapLayer, VArea7,"#A61B4A","Area 7");

var VArea8 = [{lon:'-81.980885',lat:'40.217612'},{lon:'-82.044',lat:'40.217744'},{lon:'-82.038326',lat:'39.70735299999999'},{lon:'-81.972949',lat:'39.705963'},{lon:'-81.980885',lat:'40.217612'}];
AddRaidPolygon(raid_mapLayer, VArea8,"#0BA9CC","Area 8");

var VArea9 = [{lon:'-81.9105093',lat:'40.217115'},{lon:'-81.98225830000001',lat:'40.21761200000001'},{lon:'-81.9743223',lat:'39.705963'},{lon:'-81.9026163',lat:'39.705172'},{lon:'-81.9105093',lat:'40.217115'}];
AddRaidPolygon(raid_mapLayer, VArea9,"#A61B4A","Area 9");

var VArea10 = [{lon:'-81.831321',lat:'39.704672'},{lon:'-81.840934',lat:'40.216507'},{lon:'-81.909479',lat:'40.217115'},{lon:'-81.901586',lat:'39.705172'},{lon:'-81.831321',lat:'39.704672'}];
AddRaidPolygon(raid_mapLayer, VArea10,"#0BA9CC","Area 10");

var VMentoringWorkshopArea = [{lon:'-81.844711',lat:'40.371136'},{lon:'-82.501831',lat:'40.373228'},{lon:'-82.501498',lat:'40.217818'},{lon:'-81.840934',lat:'40.216507'},{lon:'-81.844711',lat:'40.371136'}];
AddRaidPolygon(raid_mapLayer, VMentoringWorkshopArea,"#FFDD5E","Mentoring/Workshop Area");


    
	
    setTimeout(function(){CurrentRaidLocation(raid_mapLayer);},3000);
    mro_Map.events.register("moveend", Waze.map, function(){CurrentRaidLocation(raid_mapLayer);});
    mro_Map.events.register("zoomend", Waze.map, function(){CurrentRaidLocation(raid_mapLayer);});
       
}