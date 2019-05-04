// ==UserScript==
// @name                WME BR Wazers Arround
// @namespace           
// @description         Creates polygons for BR Wazers Arround layer
// @include             https://www.waze.com/editor/*
// @include             https://www.waze.com/*/editor/*
// @include             https://editor-beta.waze.com/*
// @version             1.0
// @grant               none
// @copyright           
// ==/UserScript==


//---------------------------------------------------------------------------------------


//generated by rickzabel's overlay generator

function bootstrap_MapRaidOverlay()
{
  var bGreasemonkeyServiceDefined = false;

  try {
    bGreasemonkeyServiceDefined = (typeof Components.interfaces.gmIGreasemonkeyService === "object");
  }
  catch (err) { /* Ignore */ }

  if (typeof unsafeWindow === "undefined" || ! bGreasemonkeyServiceDefined) {
    unsafeWindow    = ( function () {
      var dummyElem = document.createElement('p');
      dummyElem.setAttribute('onclick', 'return window;');
      return dummyElem.onclick();
    }) ();
  }

    /* begin running the code! */
    setTimeout(InitMapRaidOverlay, 1000);
}

function AddRaidPolygon(raidLayer,groupPoints,groupColor,groupNumber){
    
    var mro_Map = unsafeWindow.Waze.map;
    var mro_OL = unsafeWindow.OpenLayers;
    var raidGroupLabel = 'Área com "wazers próximos" ' + groupNumber;
    var groupName = 'Área com "wazers próximos" ' + groupNumber;
    
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
        pnt.push(convPoint);
    }
		       
    var ring = new mro_OL.Geometry.LinearRing(pnt);
    var polygon = new mro_OL.Geometry.Polygon([ring]);
    
    var feature = new mro_OL.Feature.Vector(polygon,attributes,style);
    raidLayer.addFeatures([feature]);

}

function CurrentRaidLocation(raid_mapLayer){
    var mro_Map = unsafeWindow.Waze.map;

    for(i=0;i<raid_mapLayer.features.length;i++){
        var raidMapCenter = mro_Map.getCenter();
        var raidCenterPoint = new OpenLayers.Geometry.Point(raidMapCenter.lon,raidMapCenter.lat);
        var raidCenterCheck = raid_mapLayer.features[i].geometry.components[0].containsPoint(raidCenterPoint);
        
        if(raidCenterCheck === true){
        	var raidLocationLabel = 'Área com "wazers próximos" ' + raid_mapLayer.features[i].attributes.number + ' - ' + $('.WazeControlLocationInfo').text();
    		
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
				var raidLocationLabel = 'Área com "wazers próximos" ' + raid_mapLayer.features[i].attributes.number + ' - ' + res2;
			} else {
				var raidLocationLabel = 'Área com "wazers próximos" ' + raid_mapLayer.features[i].attributes.number + ' - ' + $('.WazeControlLocationInfo').text();
			}	
    		setTimeout(function(){$('.WazeControlLocationInfo').text(raidLocationLabel);},200);
		}
    }
}

function InitMapRaidOverlay(){

    var mro_Map = unsafeWindow.Waze.map;
    var mro_OL = unsafeWindow.OpenLayers;

    var mro_mapLayers = mro_Map.getLayersBy("uniqueName","__BRWazersArround");
        
    var raid_mapLayer = new mro_OL.Layer.Vector("BR Wazers Arround ", {
        displayInLayerSwitcher: true,
        uniqueName: "__BRWazersArround"
    });
        
    I18n.translations.en.layers.name["__BRWazersArround"] = "BR Wazers Arround ";
    mro_Map.addLayer(raid_mapLayer);
    raid_mapLayer.setVisibility(true);

	var areasBr = [
	{loc:'Grande Sao Paulo',pts:'-46.4542702559593 -23.2082383530401,-46.2058807405631 -23.3192096812029,-45.9949197822814 -23.5611489265623,-45.9251665622044 -24.0421361843725,-46.6805428966969 -24.3075439718328,-47.1466985625775 -23.4956349727556,-46.6879683477398 -23.1657026554207,-46.4542702559593 -23.2082383530401'},
	{loc:'Rio De Janeiro, Rio De Janeiro',pts:'-43.1286880035648 -22.9865467633316,-43.2681615592109 -23.0052804005197,-43.324129156089 -22.9909671459645,-43.3814598578611 -22.9960240175752,-43.4599136217769 -23.0140477058974,-43.5368652314125 -23.0123041448786,-43.6369806349837 -23.0216655447072,-43.6864615500602 -23.0234030758542,-43.6988014850124 -22.9926034648611,-43.6819202793785 -22.8940953658789,-43.6533563032488 -22.8393701303913,-43.5712407179784 -22.7640555320229,-43.4635658939798 -22.6826131844935,-43.2840845516956 -22.6750495919315,-43.1770095938852 -22.6779362385877,-43.0552745814266 -22.6743304818482,-43.0104102624283 -22.7110594620753,-42.9881631634616 -22.7532088904919,-43.072500862472 -22.9508870469987,-43.1286880035648 -22.9865467633316'},
	{loc:'Grande Campinas',pts:'-47.0784135270987 -22.3903343702123,-46.9664333920635 -22.4045666288424,-46.8764950883321 -22.4345717804351,-46.780257365814 -22.4921852286778,-46.6875477831151 -22.5835917099472,-46.6045458114619 -22.7421557442629,-46.585512479802 -22.8303364096305,-46.5820943013088 -22.9153903421869,-47.0759799326922 -23.3877212553228,-47.281625849492 -23.3464529657332,-47.3930753862921 -23.2766727959914,-47.5203994288515 -23.1211363382163,-47.5602306914674 -23.0199909972578,-47.5784819790439 -22.9017182817379,-47.5399977048826 -22.6959615578103,-47.4280618698803 -22.5324719695294,-47.3378301918988 -22.4640209816463,-47.1983944397969 -22.4062648035972,-47.0784135270987 -22.3903343702123'},
	{loc:'Brasília',pts:'-47.47417 -15.80829,-47.4837773597984 -15.9058351610081,-47.5122302337444 -15.9996317161825,-47.5584351938487 -16.0860751165098,-47.6206166094067 -16.1618433905933,-47.6963848834902 -16.2240248061513,-47.7828282838175 -16.2702297662556,-47.8766248389919 -16.2986826402016,-47.97417 -16.30829,-48.0717151610081 -16.2986826402016,-48.1655117161825 -16.2702297662556,-48.2519551165098 -16.2240248061513,-48.3277233905933 -16.1618433905933,-48.3899048061513 -16.0860751165098,-48.4361097662556 -15.9996317161825,-48.4645626402016 -15.9058351610081,-48.47417 -15.80829,-48.4645626402016 -15.7107448389919,-48.4361097662556 -15.6169482838175,-48.3899048061513 -15.5305048834902,-48.3277233905933 -15.4547366094067,-48.2519551165098 -15.3925551938487,-48.1655117161826 -15.3463502337444,-48.0717151610081 -15.3178973597984,-47.97417 -15.30829,-47.8766248389919 -15.3178973597984,-47.7828282838175 -15.3463502337444,-47.6963848834902 -15.3925551938487,-47.6206166094067 -15.4547366094067,-47.5584351938487 -15.5305048834902,-47.5122302337444 -15.6169482838175,-47.4837773597984 -15.7107448389919,-47.47417 -15.80829'},
	{loc:'Fortaleza',pts:'-38.04651 -3.78299,-38.0561173597984 -3.88053516100806,-38.0845702337444 -3.97433171618254,-38.1307751938487 -4.0607751165098,-38.1929566094067 -4.13654339059327,-38.2687248834902 -4.19872480615127,-38.3551682838175 -4.24492976625564,-38.4489648389919 -4.27338264020162,-38.54651 -4.28299,-38.6440551610081 -4.27338264020162,-38.7378517161825 -4.24492976625564,-38.8242951165098 -4.19872480615127,-38.9000633905933 -4.13654339059327,-38.9622448061513 -4.0607751165098,-39.0084497662556 -3.97433171618255,-39.0369026402016 -3.88053516100807,-39.04651 -3.78299,-39.0369026402016 -3.68544483899194,-39.0084497662556 -3.59164828381746,-38.9622448061513 -3.5052048834902,-38.9000633905933 -3.42943660940673,-38.8242951165098 -3.36725519384873,-38.7378517161825 -3.32105023374436,-38.6440551610081 -3.29259735979839,-38.54651 -3.28299,-38.4489648389919 -3.29259735979838,-38.3551682838175 -3.32105023374436,-38.2687248834902 -3.36725519384873,-38.1929566094067 -3.42943660940673,-38.1307751938487 -3.5052048834902,-38.0845702337444 -3.59164828381745,-38.0561173597984 -3.68544483899193,-38.04651 -3.78299'},
	{loc:'Manaus',pts:'-59.4977 -3.06257,-59.5073073597984 -3.16011516100806,-59.5357602337444 -3.25391171618254,-59.5819651938487 -3.3403551165098,-59.6441466094067 -3.41612339059327,-59.7199148834902 -3.47830480615127,-59.8063582838175 -3.52450976625564,-59.9001548389919 -3.55296264020162,-59.9977 -3.56257,-60.0952451610081 -3.55296264020162,-60.1890417161825 -3.52450976625564,-60.2754851165098 -3.47830480615127,-60.3512533905933 -3.41612339059327,-60.4134348061513 -3.3403551165098,-60.4596397662556 -3.25391171618255,-60.4880926402016 -3.16011516100807,-60.4977 -3.06257,-60.4880926402016 -2.96502483899194,-60.4596397662556 -2.87122828381746,-60.4134348061513 -2.7847848834902,-60.3512533905933 -2.70901660940673,-60.2754851165098 -2.64683519384873,-60.1890417161826 -2.60063023374436,-60.0952451610081 -2.57217735979839,-59.9977 -2.56257,-59.9001548389919 -2.57217735979838,-59.8063582838175 -2.60063023374436,-59.7199148834902 -2.64683519384873,-59.6441466094067 -2.70901660940673,-59.5819651938487 -2.7847848834902,-59.5357602337444 -2.87122828381745,-59.5073073597984 -2.96502483899193,-59.4977 -3.06257'},
	{loc:'Porto Alegre',pts:'-50.67798 -30.07266,-50.6875873597984 -30.1702051610081,-50.7160402337444 -30.2640017161825,-50.7622451938487 -30.3504451165098,-50.8244266094067 -30.4262133905933,-50.9001948834902 -30.4883948061513,-50.9866382838175 -30.5345997662556,-51.0804348389919 -30.5630526402016,-51.17798 -30.57266,-51.2755251610081 -30.5630526402016,-51.3693217161825 -30.5345997662556,-51.4557651165098 -30.4883948061513,-51.5315333905933 -30.4262133905933,-51.5937148061513 -30.3504451165098,-51.6399197662556 -30.2640017161825,-51.6683726402016 -30.1702051610081,-51.67798 -30.07266,-51.6683726402016 -29.9751148389919,-51.6399197662556 -29.8813182838175,-51.5937148061513 -29.7948748834902,-51.5315333905933 -29.7191066094067,-51.4557651165098 -29.6569251938487,-51.3693217161825 -29.6107202337444,-51.2755251610081 -29.5822673597984,-51.17798 -29.57266,-51.0804348389919 -29.5822673597984,-50.9866382838175 -29.6107202337444,-50.9001948834902 -29.6569251938487,-50.8244266094067 -29.7191066094067,-50.7622451938487 -29.7948748834902,-50.7160402337444 -29.8813182838175,-50.6875873597984 -29.9751148389919,-50.67798 -30.07266'},
	{loc:'Belém',pts:'-47.95194 -1.37107,-47.9615473597984 -1.46861516100806,-47.9900002337444 -1.56241171618254,-48.0362051938487 -1.6488551165098,-48.0983866094067 -1.72462339059327,-48.1741548834902 -1.78680480615127,-48.2605982838175 -1.83300976625564,-48.3543948389919 -1.86146264020162,-48.45194 -1.87107,-48.5494851610081 -1.86146264020162,-48.6432817161825 -1.83300976625564,-48.7297251165098 -1.78680480615127,-48.8054933905933 -1.72462339059327,-48.8676748061513 -1.6488551165098,-48.9138797662556 -1.56241171618255,-48.9423326402016 -1.46861516100807,-48.95194 -1.37107,-48.9423326402016 -1.27352483899194,-48.9138797662556 -1.17972828381746,-48.8676748061513 -1.0932848834902,-48.8054933905933 -1.01751660940673,-48.7297251165098 -0.955335193848729,-48.6432817161825 -0.909130233744357,-48.5494851610081 -0.880677359798385,-48.45194 -0.87107,-48.3543948389919 -0.880677359798384,-48.2605982838175 -0.909130233744356,-48.1741548834902 -0.955335193848727,-48.0983866094067 -1.01751660940673,-48.0362051938487 -1.0932848834902,-47.9900002337444 -1.17972828381745,-47.9615473597984 -1.27352483899193,-47.95194 -1.37107'},
	{loc:'São José dos Campos',pts:'-45.76755 -23.19794,-45.7694714719597 -23.2174490322016,-45.7751620467489 -23.2362083432365,-45.7844030387697 -23.253497023302,-45.7968393218813 -23.2686506781187,-45.811992976698 -23.2810869612303,-45.8292816567635 -23.2903279532511,-45.8480409677984 -23.2960185280403,-45.86755 -23.29794,-45.8870590322016 -23.2960185280403,-45.9058183432365 -23.2903279532511,-45.923107023302 -23.2810869612303,-45.9382606781187 -23.2686506781187,-45.9506969612303 -23.253497023302,-45.9599379532511 -23.2362083432365,-45.9656285280403 -23.2174490322016,-45.96755 -23.19794,-45.9656285280403 -23.1784309677984,-45.9599379532511 -23.1596716567635,-45.9506969612303 -23.142382976698,-45.9382606781187 -23.1272293218813,-45.923107023302 -23.1147930387697,-45.9058183432365 -23.1055520467489,-45.8870590322016 -23.0998614719597,-45.86755 -23.09794,-45.8480409677984 -23.0998614719597,-45.8292816567635 -23.1055520467489,-45.811992976698 -23.1147930387697,-45.7968393218814 -23.1272293218813,-45.7844030387697 -23.142382976698,-45.7751620467489 -23.1596716567635,-45.7694714719597 -23.1784309677984,-45.76755 -23.19794'},
	{loc:'Maceió',pts:'-35.63564 -9.60204,-35.6375614719597 -9.62154903220161,-35.6432520467489 -9.64030834323651,-35.6524930387697 -9.65759702330196,-35.6649293218813 -9.67275067811866,-35.680082976698 -9.68518696123025,-35.6973716567635 -9.69442795325113,-35.7161309677984 -9.70011852804032,-35.73564 -9.70204,-35.7551490322016 -9.70011852804032,-35.7739083432365 -9.69442795325113,-35.791197023302 -9.68518696123025,-35.8063506781186 -9.67275067811866,-35.8187869612303 -9.65759702330196,-35.8280279532511 -9.64030834323651,-35.8337185280403 -9.62154903220161,-35.83564 -9.60204,-35.8337185280403 -9.58253096779839,-35.8280279532511 -9.56377165676349,-35.8187869612303 -9.54648297669804,-35.8063506781187 -9.53132932188135,-35.791197023302 -9.51889303876975,-35.7739083432365 -9.50965204674887,-35.7551490322016 -9.50396147195968,-35.73564 -9.50204,-35.7161309677984 -9.50396147195968,-35.6973716567635 -9.50965204674887,-35.680082976698 -9.51889303876975,-35.6649293218813 -9.53132932188135,-35.6524930387697 -9.54648297669804,-35.6432520467489 -9.56377165676349,-35.6375614719597 -9.58253096779839,-35.63564 -9.60204'},
	{loc:'Teresina',pts:'-42.65661 -5.0825,-42.6585314719597 -5.10200903220161,-42.6642220467489 -5.12076834323651,-42.6734630387697 -5.13805702330196,-42.6858993218813 -5.15321067811865,-42.701052976698 -5.16564696123025,-42.7183416567635 -5.17488795325113,-42.7371009677984 -5.18057852804032,-42.75661 -5.1825,-42.7761190322016 -5.18057852804032,-42.7948783432365 -5.17488795325113,-42.812167023302 -5.16564696123025,-42.8273206781187 -5.15321067811865,-42.8397569612303 -5.13805702330196,-42.8489979532511 -5.12076834323651,-42.8546885280403 -5.10200903220161,-42.85661 -5.0825,-42.8546885280403 -5.06299096779839,-42.8489979532511 -5.04423165676349,-42.8397569612303 -5.02694297669804,-42.8273206781187 -5.01178932188134,-42.812167023302 -4.99935303876974,-42.7948783432365 -4.99011204674887,-42.7761190322016 -4.98442147195968,-42.75661 -4.9825,-42.7371009677984 -4.98442147195968,-42.7183416567635 -4.99011204674887,-42.701052976698 -4.99935303876974,-42.6858993218814 -5.01178932188134,-42.6734630387697 -5.02694297669804,-42.6642220467489 -5.04423165676349,-42.6585314719597 -5.06299096779839,-42.65661 -5.0825'},
	{loc:'Natal',pts:'-35.14249 -5.7968,-35.1444114719597 -5.81630903220161,-35.1501020467489 -5.83506834323651,-35.1593430387697 -5.85235702330196,-35.1717793218813 -5.86751067811865,-35.186932976698 -5.87994696123025,-35.2042216567635 -5.88918795325113,-35.2229809677984 -5.89487852804032,-35.24249 -5.8968,-35.2619990322016 -5.89487852804032,-35.2807583432365 -5.88918795325113,-35.298047023302 -5.87994696123025,-35.3132006781186 -5.86751067811865,-35.3256369612303 -5.85235702330196,-35.3348779532511 -5.83506834323651,-35.3405685280403 -5.81630903220161,-35.34249 -5.7968,-35.3405685280403 -5.77729096779839,-35.3348779532511 -5.75853165676349,-35.3256369612303 -5.74124297669804,-35.3132006781187 -5.72608932188135,-35.298047023302 -5.71365303876975,-35.2807583432365 -5.70441204674887,-35.2619990322016 -5.69872147195968,-35.24249 -5.6968,-35.2229809677984 -5.69872147195968,-35.2042216567635 -5.70441204674887,-35.186932976698 -5.71365303876975,-35.1717793218813 -5.72608932188135,-35.1593430387697 -5.74124297669804,-35.1501020467489 -5.75853165676349,-35.1444114719597 -5.77729096779839,-35.14249 -5.7968'},
	{loc:'Campo Grande',pts:'-54.51207 -20.46911,-54.5139914719597 -20.4886190322016,-54.5196820467489 -20.5073783432365,-54.5289230387697 -20.524667023302,-54.5413593218813 -20.5398206781187,-54.556512976698 -20.5522569612303,-54.5738016567635 -20.5614979532511,-54.5925609677984 -20.5671885280403,-54.61207 -20.56911,-54.6315790322016 -20.5671885280403,-54.6503383432365 -20.5614979532511,-54.667627023302 -20.5522569612303,-54.6827806781187 -20.5398206781187,-54.6952169612303 -20.524667023302,-54.7044579532511 -20.5073783432365,-54.7101485280403 -20.4886190322016,-54.71207 -20.46911,-54.7101485280403 -20.4496009677984,-54.7044579532511 -20.4308416567635,-54.6952169612303 -20.413552976698,-54.6827806781187 -20.3983993218813,-54.667627023302 -20.3859630387697,-54.6503383432365 -20.3767220467489,-54.6315790322016 -20.3710314719597,-54.61207 -20.36911,-54.5925609677984 -20.3710314719597,-54.5738016567635 -20.3767220467489,-54.556512976698 -20.3859630387697,-54.5413593218814 -20.3983993218813,-54.5289230387697 -20.413552976698,-54.5196820467489 -20.4308416567635,-54.5139914719597 -20.4496009677984,-54.51207 -20.46911'},
	{loc:'João Pessoa',pts:'-34.7631 -7.15924,-34.7650214719597 -7.17874903220161,-34.7707120467489 -7.19750834323651,-34.7799530387697 -7.21479702330196,-34.7923893218813 -7.22995067811865,-34.807542976698 -7.24238696123025,-34.8248316567635 -7.25162795325113,-34.8435909677984 -7.25731852804032,-34.8631 -7.25924,-34.8826090322016 -7.25731852804032,-34.9013683432365 -7.25162795325113,-34.918657023302 -7.24238696123025,-34.9338106781187 -7.22995067811865,-34.9462469612303 -7.21479702330196,-34.9554879532511 -7.19750834323651,-34.9611785280403 -7.17874903220161,-34.9631 -7.15924,-34.9611785280403 -7.13973096779839,-34.9554879532511 -7.12097165676349,-34.9462469612303 -7.10368297669804,-34.9338106781187 -7.08852932188134,-34.918657023302 -7.07609303876974,-34.9013683432365 -7.06685204674887,-34.8826090322016 -7.06116147195968,-34.8631 -7.05924,-34.8435909677984 -7.06116147195968,-34.8248316567635 -7.06685204674887,-34.807542976698 -7.07609303876974,-34.7923893218814 -7.08852932188134,-34.7799530387697 -7.10368297669804,-34.7707120467489 -7.12097165676349,-34.7650214719597 -7.13973096779839,-34.7631 -7.15924'},
	{loc:'Ribeirão Preto',pts:'-47.70957 -21.17504,-47.7114914719597 -21.1945490322016,-47.7171820467489 -21.2133083432365,-47.7264230387697 -21.230597023302,-47.7388593218813 -21.2457506781187,-47.754012976698 -21.2581869612303,-47.7713016567635 -21.2674279532511,-47.7900609677984 -21.2731185280403,-47.80957 -21.27504,-47.8290790322016 -21.2731185280403,-47.8478383432365 -21.2674279532511,-47.865127023302 -21.2581869612303,-47.8802806781187 -21.2457506781187,-47.8927169612303 -21.230597023302,-47.9019579532511 -21.2133083432365,-47.9076485280403 -21.1945490322016,-47.90957 -21.17504,-47.9076485280403 -21.1555309677984,-47.9019579532511 -21.1367716567635,-47.8927169612303 -21.119482976698,-47.8802806781187 -21.1043293218813,-47.865127023302 -21.0918930387697,-47.8478383432365 -21.0826520467489,-47.8290790322016 -21.0769614719597,-47.80957 -21.07504,-47.7900609677984 -21.0769614719597,-47.7713016567635 -21.0826520467489,-47.754012976698 -21.0918930387697,-47.7388593218813 -21.1043293218813,-47.7264230387697 -21.119482976698,-47.7171820467489 -21.1367716567635,-47.7114914719597 -21.1555309677984,-47.70957 -21.17504'},
	{loc:'Uberlandia',pts:'-48.16806 -18.92055,-48.1699814719597 -18.9400590322016,-48.1756720467489 -18.9588183432365,-48.1849130387697 -18.976107023302,-48.1973493218813 -18.9912606781187,-48.212502976698 -19.0036969612303,-48.2297916567635 -19.0129379532511,-48.2485509677984 -19.0186285280403,-48.26806 -19.02055,-48.2875690322016 -19.0186285280403,-48.3063283432365 -19.0129379532511,-48.323617023302 -19.0036969612303,-48.3387706781186 -18.9912606781187,-48.3512069612303 -18.976107023302,-48.3604479532511 -18.9588183432365,-48.3661385280403 -18.9400590322016,-48.36806 -18.92055,-48.3661385280403 -18.9010409677984,-48.3604479532511 -18.8822816567635,-48.3512069612303 -18.864992976698,-48.3387706781187 -18.8498393218813,-48.323617023302 -18.8374030387697,-48.3063283432365 -18.8281620467489,-48.2875690322016 -18.8224714719597,-48.26806 -18.82055,-48.2485509677984 -18.8224714719597,-48.2297916567635 -18.8281620467489,-48.212502976698 -18.8374030387697,-48.1973493218813 -18.8498393218813,-48.1849130387697 -18.864992976698,-48.1756720467489 -18.8822816567635,-48.1699814719597 -18.9010409677984,-48.16806 -18.92055'},
	{loc:'São Luís',pts:'-43.76657 -2.56331,-43.7761773597984 -2.66085516100806,-43.8046302337444 -2.75465171618254,-43.8508351938487 -2.8410951165098,-43.9130166094067 -2.91686339059327,-43.9887848834902 -2.97904480615127,-44.0752282838175 -3.02524976625564,-44.1690248389919 -3.05370264020162,-44.26657 -3.06331,-44.3641151610081 -3.05370264020162,-44.4579117161825 -3.02524976625564,-44.5443551165098 -2.97904480615127,-44.6201233905933 -2.91686339059327,-44.6823048061513 -2.8410951165098,-44.7285097662556 -2.75465171618255,-44.7569626402016 -2.66085516100807,-44.76657 -2.56331,-44.7569626402016 -2.46576483899194,-44.7285097662556 -2.37196828381746,-44.6823048061513 -2.2855248834902,-44.6201233905933 -2.20975660940673,-44.5443551165098 -2.14757519384873,-44.4579117161826 -2.10137023374436,-44.3641151610081 -2.07291735979839,-44.26657 -2.06331,-44.1690248389919 -2.07291735979838,-44.0752282838175 -2.10137023374436,-43.9887848834902 -2.14757519384873,-43.9130166094067 -2.20975660940673,-43.8508351938487 -2.2855248834902,-43.8046302337444 -2.37196828381745,-43.7761773597984 -2.46576483899193,-43.76657 -2.56331'},
	{loc:'Belo Horizonte',pts:'-43.8766716547226 -19.8561455398762,-43.8735696131337 -19.9098765748791,-43.9008244132316 -19.9426163919019,-43.9584000447849 -20.000869661435,-43.9874088557568 -20.0116487153224,-44.0344779850299 -20.0364701157492,-44.0693987599287 -20.0395925436373,-44.0805506693477 -20.0078066019761,-44.0828004440854 -19.9666211644448,-44.1074538671618 -19.9737535479849,-44.1604138809508 -19.9790604372103,-44.211251490602 -19.9769614066641,-44.2269594293957 -19.9598440675929,-44.2090854786104 -19.9285901282948,-44.1691517564382 -19.9147855681716,-44.1210680205225 -19.9048571302495,-44.094024965455 -19.8848836789977,-44.0554394466409 -19.8497103927188,-44.0343636672277 -19.7625231520204,-43.9782686738577 -19.7632294621114,-43.9575749645096 -19.7402885229322,-43.9366334017987 -19.7422921955666,-43.904636259703 -19.775012179264,-43.89460211085 -19.8131232050988,-43.8766716547226 -19.8561455398762'},
	{loc:'Salvador',pts:'-37.93999 -12.91772,-37.9495973597984 -13.0152651610081,-37.9780502337444 -13.1090617161825,-38.0242551938487 -13.1955051165098,-38.0864366094067 -13.2712733905933,-38.1622048834902 -13.3334548061513,-38.2486482838175 -13.3796597662556,-38.3424448389919 -13.4081126402016,-38.43999 -13.41772,-38.5375351610081 -13.4081126402016,-38.6313317161825 -13.3796597662556,-38.7177751165098 -13.3334548061513,-38.7935433905933 -13.2712733905933,-38.8557248061513 -13.1955051165098,-38.9019297662556 -13.1090617161825,-38.9303826402016 -13.0152651610081,-38.93999 -12.91772,-38.9303826402016 -12.8201748389919,-38.9019297662556 -12.7263782838175,-38.8557248061513 -12.6399348834902,-38.7935433905933 -12.5641666094067,-38.7177751165098 -12.5019851938487,-38.6313317161826 -12.4557802337444,-38.5375351610081 -12.4273273597984,-38.43999 -12.41772,-38.3424448389919 -12.4273273597984,-38.2486482838175 -12.4557802337444,-38.1622048834902 -12.5019851938487,-38.0864366094067 -12.5641666094067,-38.0242551938487 -12.6399348834902,-37.9780502337444 -12.7263782838175,-37.9495973597984 -12.8201748389919,-37.93999 -12.91772'},
	{loc:'Curitiba, Jaboatão dos Guararapes, Recife',pts:'-34.42858 -8.05819,-34.4381873597984 -8.15573516100806,-34.4666402337444 -8.24953171618254,-34.5128451938487 -8.3359751165098,-34.5750266094067 -8.41174339059327,-34.6240424827843 -8.4519696782882,-34.6507948834902 -8.47392480615127,-34.7372382838175 -8.52012976625564,-34.7375564815625 -8.52022629048634,-34.7377395276278 -8.5202818169032,-34.7380152172443 -8.52036544643407,-34.7382368999134 -8.52043269313655,-34.7384153311585 -8.520486819663,-34.7402095178256 -8.52144583241654,-34.7414598263586 -8.52211413625081,-34.7422911216901 -8.52255847286275,-34.7441082838175 -8.52352976625564,-34.8108488744644 -8.54377530309038,-34.8379048389919 -8.55198264020162,-34.93545 -8.56159,-35.0329951610081 -8.55198264020162,-35.0701322273502 -8.54071723428783,-35.1267917161825 -8.52352976625564,-35.2132351165098 -8.47732480615127,-35.236776020472 -8.45800528555259,-35.2890033905933 -8.41514339059328,-35.3511848061513 -8.3393751165098,-35.3610723164547 -8.32087688581193,-35.3973897662556 -8.25293171618255,-35.4258426402016 -8.15913516100807,-35.43545 -8.06159,-35.43545 -8.06159,-35.4353344916666 -8.06041722420926,-35.4289534308225 -7.99562922620596,-35.4258426402016 -7.96404483899194,-35.3973897662556 -7.87024828381746,-35.3915101845801 -7.85924836018616,-35.3866082711879 -7.85007752526327,-35.3814018203127 -7.84033694078336,-35.3678615650659 -7.81500490495452,-35.3511848061513 -7.7838048834902,-35.2890033905933 -7.70803660940673,-35.2359269414522 -7.66447789330411,-35.2188979796642 -7.65050258553487,-35.2132351165098 -7.64585519384873,-35.2033821568386 -7.64058867718237,-35.1990754995499 -7.63828672090284,-35.1267917161826 -7.59965023374436,-35.1256146688414 -7.59929318033696,-35.1199217161825 -7.59625023374436,-35.0969758411115 -7.58928967863908,-35.087098687918 -7.58629347697435,-35.0742530534112 -7.58239679634788,-35.0261251610081 -7.56779735979838,-34.92858 -7.55819,-34.8310348389919 -7.56779735979838,-34.7872369440626 -7.58108330597418,-34.7372382838175 -7.59625023374436,-34.6507948834902 -7.64245519384873,-34.6424345248893 -7.6493163628362,-34.5750266094067 -7.70463660940672,-34.5128451938487 -7.7804048834902,-34.4666402337444 -7.86684828381745,-34.4381873597984 -7.96064483899193,-34.42858 -8.05819'},
	{loc:'Goiânia',pts:'-48.79781 -16.67355,-48.8074173597984 -16.7710951610081,-48.8358702337444 -16.8648917161825,-48.8820751938487 -16.9513351165098,-48.9442566094067 -17.0271033905933,-49.0200248834902 -17.0892848061513,-49.1064682838175 -17.1354897662556,-49.2002648389919 -17.1639426402016,-49.29781 -17.17355,-49.3953551610081 -17.1639426402016,-49.4891517161825 -17.1354897662556,-49.5755951165098 -17.0892848061513,-49.6513633905933 -17.0271033905933,-49.7135448061513 -16.9513351165098,-49.7597497662556 -16.8648917161825,-49.7882026402016 -16.7710951610081,-49.79781 -16.67355,-49.7882026402016 -16.5760048389919,-49.7597497662556 -16.4822082838175,-49.7135448061513 -16.3957648834902,-49.6513633905933 -16.3199966094067,-49.5755951165098 -16.2578151938487,-49.4891517161825 -16.2116102337444,-49.3953551610081 -16.1831573597984,-49.29781 -16.17355,-49.2002648389919 -16.1831573597984,-49.1064682838175 -16.2116102337444,-49.0200248834902 -16.2578151938487,-48.9442566094067 -16.3199966094067,-48.8820751938487 -16.3957648834902,-48.8358702337444 -16.4822082838175,-48.8074173597984 -16.5760048389919,-48.79781 -16.67355'}
	]

	for(iArea=0;iArea<areasBr.length;iArea++)
	{
		var V01ChiangMai_1 = [];//[{lon:'99.1625977',lat:'20.1474954'}];
		
		var cordenadas = areasBr[iArea].pts.split(',');
		for(j=0;j<cordenadas.length;j++)
		{			
			V01ChiangMai_1.push({lon:cordenadas[j].split(' ')[0], lat:cordenadas[j].split(' ')[1]});
		}
		
		console.log(iArea);
		console.log(V01ChiangMai_1);
		AddRaidPolygon(raid_mapLayer, V01ChiangMai_1, getRandomColor(), areasBr[iArea].loc);
	}
	
    setTimeout(function(){CurrentRaidLocation(raid_mapLayer);},3000);
    mro_Map.events.register("moveend", Waze.map, function(){CurrentRaidLocation(raid_mapLayer);});
    mro_Map.events.register("zoomend", Waze.map, function(){CurrentRaidLocation(raid_mapLayer);});
       
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

bootstrap_MapRaidOverlay(); 
