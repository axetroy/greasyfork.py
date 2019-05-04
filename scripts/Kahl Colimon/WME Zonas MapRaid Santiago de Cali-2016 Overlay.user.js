// ==UserScript==
// @name                WME Zonas MapRaid Santiago de Cali-2016 Overlay
// @namespace           https://greasyfork.org/es/users/33476-kahl-colimon
// @description         Delimita zonas para el MapRaid Santiago de Cali 2016
// @include             https://www.waze.com/editor/*
// @include             https://www.waze.com/*/editor/*
// @include             https://editor-beta.waze.com/*
// @version             4.3
// @icon                http://www.cali.com/images/1450_2009021512_tmb1.jpg
// @grant               none
// @author              Kahl Colimon
// @copyright           2016
// ==/UserScript==


//---------------------------------------------------------------------------------------


//RZ RaidName will be replaced by the name of the layer in your KML file
//RZ RaidNameNoSpaces will be replaced by the name of the layer in your KML file
//RZ AreaPoints will be replaced by the names, colors, and area points from your KML file

setTimeout(InitMapRaidOverlay, 1000);

function AddRaidPolygon(raidLayer,groupPoints,groupColor,groupNumber){
    
    var mro_Map = Waze.map;
    var mro_OL = OpenLayers;
    var raidGroupLabel = 'Zona ' + groupNumber;
    var groupName = 'Zona' + groupNumber;
    
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
		var holes = raid_mapLayer.features[i].attributes.holes
		
        
        if(raidCenterCheck === true){

			var str = $('#topbar-container > div > div > div.location-info-region > div').text();
			
			var n2 = str.indexOf(" - ");
			
			if(n2 > 0){
				var n = str.length;
				var res = str.substring(n2+2, n);
				var rescount = res.indexOf(" - ");
				if(rescount>0){
					var n3 = res.length;
					var res2 = res.substring(rescount+2, n3);
				}
				var raidLocationLabel = '[Zona - ' + raid_mapLayer.features[i].attributes.number + '] - ' + res2;

			} else {
				var raidLocationLabel = '[Zona - ' + raid_mapLayer.features[i].attributes.number + '] - ' + $('#topbar-container > div > div > div.location-info-region > div').text();
						
			}	
			setTimeout(function(){$('#topbar-container > div > div > div.location-info-region > div').text(raidLocationLabel);},200);
			 if (holes === "false") { break; }
		}
    }
}

function InitMapRaidOverlay(){

    var mro_Map = Waze.map;
    var mro_OL = OpenLayers;

    //if (!mro_Map) return;
	
    //if (!mro_OL) return;

    var mro_mapLayers = mro_Map.getLayersBy("uniqueName","__MRSantiagodeCali2016");
        
    var raid_mapLayer = new mro_OL.Layer.Vector("MR Santiago de Cali 2016", {
        displayInLayerSwitcher: true,
        uniqueName: "__MRSantiagodeCali2016"
    });
        
    I18n.translations.en.layers.name["__MRSantiagodeCali2016"] = "MR Santiago de Cali 2016";
    mro_Map.addLayer(raid_mapLayer);
    raid_mapLayer.setVisibility(true);
    

var V1 = [{lon:'-76.531105',lat:'3.4421414'},{lon:'-76.5175438',lat:'3.4447117'},{lon:'-76.5199471',lat:'3.4608186'},{lon:'-76.4940262',lat:'3.5267854'},{lon:'-76.5254402',lat:'3.5261'},{lon:'-76.5556526',lat:'3.4877199'},{lon:'-76.5917015',lat:'3.4644169'},{lon:'-76.5755653',lat:'3.4419701'},{lon:'-76.531105',lat:'3.4421414'}];
AddRaidPolygon(raid_mapLayer, V1,"#7C3592","Nor-Occidental");
 
var V2 = [{lon:'-76.5755653',lat:'3.4419701'},{lon:'-76.5496445',lat:'3.3009373'},{lon:'-76.5312767',lat:'3.2933967'},{lon:'-76.5074158',lat:'3.3024797'},{lon:'-76.5175438',lat:'3.4447117'},{lon:'-76.531105',lat:'3.4421414'},{lon:'-76.5755653',lat:'3.4419701'}];
AddRaidPolygon(raid_mapLayer, V2,"#FFDD5E","Sur-Occidental");

var V3 = [{lon:'-76.5175438',lat:'3.4447117'},{lon:'-76.456089',lat:'3.4532792'},{lon:'-76.4567757',lat:'3.5231873'},{lon:'-76.4940262',lat:'3.5267854'},{lon:'-76.5199471',lat:'3.4608186'},{lon:'-76.5175438',lat:'3.4447117'}];
AddRaidPolygon(raid_mapLayer, V3,"#A61B4A","Nor-Oriental");

var V4 = [{lon:'-76.456089',lat:'3.4532792'},{lon:'-76.5175438',lat:'3.4447117'},{lon:'-76.5097332',lat:'3.3340124'},{lon:'-76.4559174',lat:'3.345837'},{lon:'-76.456089',lat:'3.4532792'}];
AddRaidPolygon(raid_mapLayer, V4,"#4186F0","Sur-Oriental");

    
	
	
    setTimeout(function(){CurrentRaidLocation(raid_mapLayer);},3000);
    mro_Map.events.register("moveend", Waze.map, function(){ setTimeout(function(){CurrentRaidLocation(raid_mapLayer);},1500);});
    mro_Map.events.register("zoomend", Waze.map, function(){ setTimeout(function(){CurrentRaidLocation(raid_mapLayer);},1500);});
       

}