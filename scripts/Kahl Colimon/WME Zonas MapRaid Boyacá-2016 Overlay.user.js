// ==UserScript==
// @name                WME Zonas MapRaid Boyacá-2016 Overlay
// @namespace           https://greasyfork.org/es/users/33476-kahl-colimon
// @description         Delimita zonas para el MapRaid Boyacá 2016
// @include             https://www.waze.com/editor/*
// @include             https://www.waze.com/*/editor/*
// @include             https://editor-beta.waze.com/*
// @version             4.3
// @icon                http://www.todacolombia.com/imagenes/departamentos-de-colombia/simbolos-departamentos/bandera-boyaca.png
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

    var mro_mapLayers = mro_Map.getLayersBy("uniqueName","__MRBoyacá2016");
        
    var raid_mapLayer = new mro_OL.Layer.Vector("MR Boyacá 2016", {
        displayInLayerSwitcher: true,
        uniqueName: "__MRBoyacá2016"
    });
        
    I18n.translations.en.layers.name["__MRBoyacá2016"] = "MR Boyacá 2016";
    mro_Map.addLayer(raid_mapLayer);
    raid_mapLayer.setVisibility(true);
    

var V1 = [{lon:'-73.3900452',lat:'5.754006'},{lon:'-73.3563757',lat:'6.0439094'},{lon:'-73.5182278',lat:'6.1369745'},{lon:'-73.7983332',lat:'5.7545419'},{lon:'-74.534293',lat:'6.2895848'},{lon:'-74.6129608',lat:'6.1361172'},{lon:'-74.680252',lat:'5.7481989'},{lon:'-73.23349',lat:'4.6380233'},{lon:'-73.1112671',lat:'4.6174911'},{lon:'-73.049469',lat:'4.7310952'},{lon:'-73.4326172',lat:'5.477933'},{lon:'-73.3900452',lat:'5.754006'}];
AddRaidPolygon(raid_mapLayer, V1,"#7C3592","Grupo 1");
 
var V2 = [{lon:'-73.3900452',lat:'5.754006'},{lon:'-73.4326172',lat:'5.477933'},{lon:'-73.049469',lat:'4.7310952'},{lon:'-72.8599548',lat:'5.0608503'},{lon:'-73.3900452',lat:'5.754006'}];
AddRaidPolygon(raid_mapLayer, V2,"#FFDD5E","Grupo 2");

var V3 = [{lon:'-73.3900452',lat:'5.754006'},{lon:'-72.9496479',lat:'5.1783325'},{lon:'-72.6745605',lat:'5.2872037'},{lon:'-72.964695',lat:'5.7099551'},{lon:'-73.0014348',lat:'5.8328457'},{lon:'-73.1352996',lat:'5.9954602'},{lon:'-73.201232',lat:'6.0145862'},{lon:'-73.3509064',lat:'5.8479362'},{lon:'-73.3900452',lat:'5.754006'}];
AddRaidPolygon(raid_mapLayer, V3,"#A61B4A","Grupo 3");

var V4 = [{lon:'-73.1352996',lat:'5.9954602'},{lon:'-73.0014348',lat:'5.8328457'},{lon:'-72.964695',lat:'5.7099551'},{lon:'-72.6745605',lat:'5.2872037'},{lon:'-72.3065186',lat:'5.4765659'},{lon:'-72.2131348',lat:'5.6911494'},{lon:'-72.313385',lat:'6.0777422'},{lon:'-72.3924351',lat:'6.2273366'},{lon:'-72.1273041',lat:'6.5152258'},{lon:'-71.9487119',lat:'7.0096854'},{lon:'-71.9497848',lat:'7.0109845'},{lon:'-72.0565796',lat:'7.043994'},{lon:'-72.1798325',lat:'7.0664817'},{lon:'-72.5001526',lat:'6.9393777'},{lon:'-72.8173828',lat:'6.5964023'},{lon:'-73.1352996',lat:'5.9954602'}];
AddRaidPolygon(raid_mapLayer, V4,"#4186F0","Grupo 4");

    
	
	
    setTimeout(function(){CurrentRaidLocation(raid_mapLayer);},3000);
    mro_Map.events.register("moveend", Waze.map, function(){ setTimeout(function(){CurrentRaidLocation(raid_mapLayer);},1500);});
    mro_Map.events.register("zoomend", Waze.map, function(){ setTimeout(function(){CurrentRaidLocation(raid_mapLayer);},1500);});
       

}