// ==UserScript==
// @name                WME MapRaid Puerto Rico Overlay
// @namespace           https://greasyfork.org/en/users/5920-rickzabel
// @description         Creates polygons for MapRaid groups in a WME "MapRaid Puerto Rico  8-16-15" layer
// @include             https://www.waze.com/editor/*
// @include             https://www.waze.com/*/editor/*
// @include             https://editor-beta.waze.com/*
// @version             1.8
// @grant               none
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

    var mro_mapLayers = mro_Map.getLayersBy("uniqueName","__MapRaidPuertoRico");
        
    var raid_mapLayer = new mro_OL.Layer.Vector("MapRaid Puerto Rico 8-16-15", {
        displayInLayerSwitcher: true,
        uniqueName: "__MapRaidPuertoRico"
    });
        
    I18n.translations.en.layers.name["__MapRaidPuertoRico"] = "MapRaid Puerto Rico 8-16-15";
    mro_Map.addLayer(raid_mapLayer);
    raid_mapLayer.setVisibility(true);
    

var VArea1 = [{lon:'-66.179666',lat:'18.480097'},{lon:'-66.205974',lat:'18.476148999999996'},{lon:'-66.25391',lat:'18.476027'},{lon:'-66.257858',lat:'18.46927'},{lon:'-66.26112',lat:'18.418544'},{lon:'-66.259017',lat:'18.406655'},{lon:'-66.256657',lat:'18.396882'},{lon:'-66.252537',lat:'18.394276'},{lon:'-66.245413',lat:'18.393542'},{lon:'-66.243353',lat:'18.388411'},{lon:'-66.253653',lat:'18.371795000000002'},{lon:'-66.248074',lat:'18.370003000000004'},{lon:'-66.236916',lat:'18.369922000000003'},{lon:'-66.240778',lat:'18.362957'},{lon:'-66.24464',lat:'18.359332'},{lon:'-66.244555',lat:'18.356073'},{lon:'-66.240692',lat:'18.352733'},{lon:'-66.240349',lat:'18.349149'},{lon:'-66.244211',lat:'18.347764000000005'},{lon:'-66.243439',lat:'18.345972'},{lon:'-66.237688',lat:'18.344341999999997'},{lon:'-66.234169',lat:'18.340758'},{lon:'-66.233997',lat:'18.336928'},{lon:'-66.237688',lat:'18.332691999999998'},{lon:'-66.232023',lat:'18.323811'},{lon:'-66.221123',lat:'18.332936'},{lon:'-66.215737',lat:'18.333995'},{lon:'-66.213441',lat:'18.323647999999995'},{lon:'-66.206789',lat:'18.323484999999998'},{lon:'-66.204386',lat:'18.314318'},{lon:'-66.205931',lat:'18.307025'},{lon:'-66.016502',lat:'18.310366'},{lon:'-66.020622',lat:'18.314359'},{lon:'-66.019163',lat:'18.318107'},{lon:'-66.012554',lat:'18.32104'},{lon:'-66.015816',lat:'18.328455'},{lon:'-66.015816',lat:'18.331714'},{lon:'-66.014013',lat:'18.334076999999997'},{lon:'-66.009378',lat:'18.335053999999996'},{lon:'-66.007576',lat:'18.336846999999995'},{lon:'-66.006632',lat:'18.339371999999997'},{lon:'-66.000795',lat:'18.344342'},{lon:'-66.00088100000002',lat:'18.346868'},{lon:'-66.003113',lat:'18.349638'},{lon:'-66.007318',lat:'18.351674'},{lon:'-66.010838',lat:'18.353467'},{lon:'-66.010923',lat:'18.355422'},{lon:'-66.009464',lat:'18.356888'},{lon:'-65.995817',lat:'18.357458'},{lon:'-65.988693',lat:'18.360146'},{lon:'-65.986204',lat:'18.359331999999995'},{lon:'-65.983458',lat:'18.357947'},{lon:'-65.980282',lat:'18.359169'},{lon:'-65.977535',lat:'18.362509000000003'},{lon:'-65.974874',lat:'18.363486'},{lon:'-65.972729',lat:'18.362671999999996'},{lon:'-65.970411',lat:'18.360961000000003'},{lon:'-65.966463',lat:'18.360391'},{lon:'-65.96509',lat:'18.36202'},{lon:'-65.960369',lat:'18.372202'},{lon:'-65.958309',lat:'18.373261'},{lon:'-65.950756',lat:'18.372772'},{lon:'-65.951614',lat:'18.381813999999995'},{lon:'-65.936508',lat:'18.381162'},{lon:'-65.922174',lat:'18.386294'},{lon:'-65.917625',lat:'18.38328'},{lon:'-65.910158',lat:'18.388247999999997'},{lon:'-65.91342',lat:'18.390366'},{lon:'-65.913076',lat:'18.395008'},{lon:'-65.90964300000002',lat:'18.40128'},{lon:'-65.890074',lat:'18.426525'},{lon:'-65.882778',lat:'18.433609000000004'},{lon:'-65.870418',lat:'18.447207'},{lon:'-65.915566',lat:'18.459419'},{lon:'-66.138039',lat:'18.479283'},{lon:'-66.165161',lat:'18.463653'},{lon:'-66.179666',lat:'18.480097'}];
AddRaidPolygon(raid_mapLayer, VArea1,"#DB4436","Area 1");

var VArea2 = [{lon:'-65.870418',lat:'18.447207'},{lon:'-65.882778',lat:'18.433609000000004'},{lon:'-65.899086',lat:'18.41545'},{lon:'-65.912132',lat:'18.397859000000004'},{lon:'-65.91342',lat:'18.390366'},{lon:'-65.910759',lat:'18.387108'},{lon:'-65.917625',lat:'18.38328'},{lon:'-65.922174',lat:'18.386294'},{lon:'-65.936508',lat:'18.381162'},{lon:'-65.951614',lat:'18.381813999999995'},{lon:'-65.950756',lat:'18.372772'},{lon:'-65.958309',lat:'18.373261'},{lon:'-65.961227',lat:'18.370980000000003'},{lon:'-65.966463',lat:'18.360391'},{lon:'-65.970411',lat:'18.360961000000003'},{lon:'-65.974874',lat:'18.363486'},{lon:'-65.977535',lat:'18.362509000000003'},{lon:'-65.980282',lat:'18.359169'},{lon:'-65.983458',lat:'18.357947'},{lon:'-65.988693',lat:'18.360146'},{lon:'-65.995817',lat:'18.357458'},{lon:'-66.009464',lat:'18.356888'},{lon:'-66.010923',lat:'18.355422'},{lon:'-66.010838',lat:'18.353467'},{lon:'-66.003113',lat:'18.349638'},{lon:'-66.000538',lat:'18.345401'},{lon:'-66.006632',lat:'18.339371999999997'},{lon:'-66.009378',lat:'18.335053999999996'},{lon:'-66.012554',lat:'18.334321'},{lon:'-66.014013',lat:'18.334076999999997'},{lon:'-66.015816',lat:'18.328455'},{lon:'-66.012554',lat:'18.32104'},{lon:'-66.019163',lat:'18.318107'},{lon:'-66.020622',lat:'18.314359'},{lon:'-66.016502',lat:'18.310366'},{lon:'-66.020622',lat:'18.306780999999997'},{lon:'-66.02972',lat:'18.303521'},{lon:'-66.030579',lat:'18.299773'},{lon:'-66.027489',lat:'18.297002'},{lon:'-66.029892',lat:'18.292439'},{lon:'-66.02731700000001',lat:'18.28706'},{lon:'-66.017532',lat:'18.285267'},{lon:'-66.016674',lat:'18.281355'},{lon:'-66.011524',lat:'18.280214'},{lon:'-66.008263',lat:'18.276464999999998'},{lon:'-66.00852',lat:'18.271616000000005'},{lon:'-65.997706',lat:'18.267622'},{lon:'-65.98423',lat:'18.262282999999996'},{lon:'-65.976849',lat:'18.263099'},{lon:'-65.965219',lat:'18.25886'},{lon:'-65.955048',lat:'18.25723'},{lon:'-65.93977',lat:'18.249731'},{lon:'-65.925522',lat:'18.242476000000003'},{lon:'-65.916424',lat:'18.23783'},{lon:'-65.905438',lat:'18.242068'},{lon:'-65.896854',lat:'18.238970999999996'},{lon:'-65.880547',lat:'18.230004'},{lon:'-65.859432',lat:'18.218916'},{lon:'-65.831451',lat:'18.210111'},{lon:'-65.803127',lat:'18.20685'},{lon:'-65.774288',lat:'18.207502'},{lon:'-65.704594',lat:'18.172928'},{lon:'-65.669746',lat:'18.175212'},{lon:'-65.590439',lat:'18.212068'},{lon:'-65.570526',lat:'18.249242'},{lon:'-65.602112',lat:'18.381244'},{lon:'-65.622024',lat:'18.393624'},{lon:'-65.870418',lat:'18.447207'}];
AddRaidPolygon(raid_mapLayer, VArea2,"#0BA9CC","Area 2");

var VArea3 = [{lon:'-66.213055',lat:'18.307188'},{lon:'-66.212711',lat:'18.172765000000002'},{lon:'-66.234684',lat:'17.975956999999998'},{lon:'-66.216488',lat:'17.953096'},{lon:'-66.225758',lat:'17.922228999999998'},{lon:'-66.176319',lat:'17.904752'},{lon:'-65.976334',lat:'17.941502'},{lon:'-65.821152',lat:'18.001591'},{lon:'-65.704594',lat:'18.172928'},{lon:'-65.774288',lat:'18.207502'},{lon:'-65.801067',lat:'18.206523000000004'},{lon:'-65.83025',lat:'18.209947999999997'},{lon:'-65.859432',lat:'18.218916'},{lon:'-65.898571',lat:'18.239134'},{lon:'-65.905438',lat:'18.242068'},{lon:'-65.916424',lat:'18.23783'},{lon:'-65.955048',lat:'18.25723'},{lon:'-65.965219',lat:'18.25886'},{lon:'-65.976849',lat:'18.263099'},{lon:'-65.98423',lat:'18.262282999999996'},{lon:'-66.007576',lat:'18.270271'},{lon:'-66.008263',lat:'18.276464999999998'},{lon:'-66.011524',lat:'18.280214'},{lon:'-66.016674',lat:'18.281355'},{lon:'-66.017532',lat:'18.285267'},{lon:'-66.02731700000001',lat:'18.28706'},{lon:'-66.029892',lat:'18.292439'},{lon:'-66.027489',lat:'18.297002'},{lon:'-66.030579',lat:'18.299773'},{lon:'-66.02972',lat:'18.303521'},{lon:'-66.023026',lat:'18.305314000000003'},{lon:'-66.016502',lat:'18.310366'},{lon:'-66.213055',lat:'18.307188'}];
AddRaidPolygon(raid_mapLayer, VArea3,"#F8971B","Area 3");

var VArea4 = [{lon:'-66.213055',lat:'18.307188'},{lon:'-66.205931',lat:'18.307025'},{lon:'-66.204987',lat:'18.316966'},{lon:'-66.206789',lat:'18.323484999999998'},{lon:'-66.213441',lat:'18.323647999999995'},{lon:'-66.215737',lat:'18.333995'},{lon:'-66.221123',lat:'18.332936'},{lon:'-66.232023',lat:'18.323811'},{lon:'-66.237688',lat:'18.332691999999998'},{lon:'-66.233997',lat:'18.336928'},{lon:'-66.234169',lat:'18.340758'},{lon:'-66.237688',lat:'18.344341999999997'},{lon:'-66.243439',lat:'18.345972'},{lon:'-66.244211',lat:'18.347764000000005'},{lon:'-66.240349',lat:'18.349149'},{lon:'-66.240692',lat:'18.352733'},{lon:'-66.244555',lat:'18.356073'},{lon:'-66.24464',lat:'18.359332'},{lon:'-66.239662',lat:'18.364138'},{lon:'-66.236916',lat:'18.369922000000003'},{lon:'-66.248074',lat:'18.370003000000004'},{lon:'-66.253653',lat:'18.371795000000002'},{lon:'-66.243353',lat:'18.388411'},{lon:'-66.244297',lat:'18.393624'},{lon:'-66.252537',lat:'18.394276'},{lon:'-66.256657',lat:'18.396882'},{lon:'-66.26112',lat:'18.418544'},{lon:'-66.257858',lat:'18.46927'},{lon:'-66.25391',lat:'18.476027'},{lon:'-66.257858',lat:'18.486121'},{lon:'-66.347122',lat:'18.501099'},{lon:'-66.528397',lat:'18.49654'},{lon:'-66.559296',lat:'18.251524'},{lon:'-66.562042',lat:'18.134759'},{lon:'-66.539383',lat:'18.029669'},{lon:'-66.53801',lat:'17.974161'},{lon:'-66.439819',lat:'17.938888'},{lon:'-66.259918',lat:'17.927783'},{lon:'-66.225758',lat:'17.922228999999998'},{lon:'-66.216488',lat:'17.953096'},{lon:'-66.234684',lat:'17.975956999999998'},{lon:'-66.212711',lat:'18.172765000000002'},{lon:'-66.213055',lat:'18.307188'}];
AddRaidPolygon(raid_mapLayer, VArea4,"#0BA9CC","Area 4");

var VArea5 = [{lon:'-66.528397',lat:'18.49654'},{lon:'-66.830864',lat:'18.498167999999996'},{lon:'-66.836186',lat:'18.488563'},{lon:'-66.83738700000002',lat:'18.480911'},{lon:'-66.831894',lat:'18.471794'},{lon:'-66.830692',lat:'18.464467000000003'},{lon:'-66.828632',lat:'18.457302999999996'},{lon:'-66.825199',lat:'18.456'},{lon:'-66.827946',lat:'18.436133'},{lon:'-66.823826',lat:'18.418056'},{lon:'-66.820908',lat:'18.404374'},{lon:'-66.817303',lat:'18.394438'},{lon:'-66.810608',lat:'18.386456'},{lon:'-66.816273',lat:'18.363648999999995'},{lon:'-66.819706',lat:'18.353222'},{lon:'-66.823826',lat:'18.341654'},{lon:'-66.826057',lat:'18.323078'},{lon:'-66.769924',lat:'18.319818'},{lon:'-66.713619',lat:'18.314929'},{lon:'-66.696796',lat:'18.321448'},{lon:'-66.670361',lat:'18.324055'},{lon:'-66.61474200000002',lat:'18.331551'},{lon:'-66.550026',lat:'18.326826'},{lon:'-66.528397',lat:'18.49654'}];
AddRaidPolygon(raid_mapLayer, VArea5,"#A61B4A","Area 5");

var VArea6 = [{lon:'-66.830864',lat:'18.498167999999996'},{lon:'-66.995316',lat:'18.513796'},{lon:'-67.043381',lat:'18.521609'},{lon:'-67.090759',lat:'18.523237'},{lon:'-67.134018',lat:'18.518353'},{lon:'-67.16114',lat:'18.502726'},{lon:'-67.285423',lat:'18.366908'},{lon:'-67.248344',lat:'18.297817'},{lon:'-67.190666',lat:'18.265218'},{lon:'-67.159424',lat:'18.273368'},{lon:'-67.124748',lat:'18.27239'},{lon:'-67.07222',lat:'18.259675'},{lon:'-67.037888',lat:'18.280214000000004'},{lon:'-66.914635',lat:'18.270433999999998'},{lon:'-66.827087',lat:'18.244677'},{lon:'-66.826057',lat:'18.323078'},{lon:'-66.82365400000002',lat:'18.343772'},{lon:'-66.816273',lat:'18.363648999999995'},{lon:'-66.811295',lat:'18.388411000000005'},{lon:'-66.817303',lat:'18.394438'},{lon:'-66.827946',lat:'18.436133'},{lon:'-66.825199',lat:'18.456'},{lon:'-66.828632',lat:'18.457302999999996'},{lon:'-66.831894',lat:'18.471794'},{lon:'-66.83738700000002',lat:'18.480911'},{lon:'-66.830864',lat:'18.498167999999996'}];
AddRaidPolygon(raid_mapLayer, VArea6,"#4186F0","Area 6");

var VArea7 = [{lon:'-66.550026',lat:'18.326826'},{lon:'-66.61474200000002',lat:'18.331551'},{lon:'-66.696796',lat:'18.321448'},{lon:'-66.713619',lat:'18.314929'},{lon:'-66.826057',lat:'18.323078'},{lon:'-66.827087',lat:'18.244677'},{lon:'-66.825714',lat:'18.020201'},{lon:'-66.777992',lat:'17.989836'},{lon:'-66.763229',lat:'17.949014'},{lon:'-66.554832',lat:'17.946074'},{lon:'-66.53801',lat:'17.974161'},{lon:'-66.539383',lat:'18.029669'},{lon:'-66.562042',lat:'18.134759'},{lon:'-66.559296',lat:'18.251524'},{lon:'-66.550026',lat:'18.326826'}];
AddRaidPolygon(raid_mapLayer, VArea7,"#F8971B","Area 7");

var VArea8 = [{lon:'-66.827087',lat:'18.244677'},{lon:'-66.914635',lat:'18.270433999999998'},{lon:'-67.037888',lat:'18.280214000000004'},{lon:'-67.07222',lat:'18.259675'},{lon:'-67.124748',lat:'18.27239'},{lon:'-67.159424',lat:'18.273368'},{lon:'-67.190666',lat:'18.265218'},{lon:'-67.226715',lat:'17.949667'},{lon:'-67.199593',lat:'17.924843'},{lon:'-66.867256',lat:'17.921902999999997'},{lon:'-66.772842',lat:'17.975793999999997'},{lon:'-66.777992',lat:'17.989836'},{lon:'-66.825714',lat:'18.020201'},{lon:'-66.827087',lat:'18.244677'}];
AddRaidPolygon(raid_mapLayer, VArea8,"#A61B4A","Area 8");

var VArea9 = [{lon:'-65.606232',lat:'18.121054999999995'},{lon:'-65.562286',lat:'18.051867000000005'},{lon:'-65.24437',lat:'18.103434'},{lon:'-65.175018',lat:'18.301729'},{lon:'-65.24231',lat:'18.358436'},{lon:'-65.369339',lat:'18.371469'},{lon:'-65.606232',lat:'18.121054999999995'}];
AddRaidPolygon(raid_mapLayer, VArea9,"#A61B4A","Area 9");

var VPolygon1 = [{lon:'-67.2253418',lat:'18.5707583'},{lon:'-67.3269653',lat:'18.3805921'},{lon:'-67.2555542',lat:'18.239786'},{lon:'-67.3049927',lat:'17.9029552'},{lon:'-66.2008667',lat:'17.882045299999998'},{lon:'-65.8190918',lat:'17.9552193'},{lon:'-65.574646',lat:'18.017915799999997'},{lon:'-65.2230835',lat:'18.075368'},{lon:'-65.1159668',lat:'18.2945575'},{lon:'-65.1928711',lat:'18.3805921'},{lon:'-65.5801392',lat:'18.4092608'},{lon:'-65.9344482',lat:'18.490028600000002'},{lon:'-67.2253418',lat:'18.5707583'}];
AddRaidPolygon(raid_mapLayer, VPolygon1,"#000000","Polygon 1");


    
	
    setTimeout(function(){CurrentRaidLocation(raid_mapLayer);},3000);
    mro_Map.events.register("moveend", Waze.map, function(){CurrentRaidLocation(raid_mapLayer);});
    mro_Map.events.register("zoomend", Waze.map, function(){CurrentRaidLocation(raid_mapLayer);});
       
}