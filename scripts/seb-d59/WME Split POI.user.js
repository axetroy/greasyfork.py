// ==UserScript==
// @name            WME Split POI
// @namespace	      https://greasyfork.org/fr/scripts/13008-wme-split-poi
// @description	    Split POI with a new seg
// @description:fr  Découpage d'un POI en deux en utisant un nouveau segment
// @include	        https://www.waze.com/editor*
// @include	        https://www.waze.com/*/editor*
// @include	        https://beta.waze.com/editor*
// @include	        https://beta.waze.com/*/editor*
// @exclude         https://www.waze.com/user*
// @exclude         https://www.waze.com/*/user*
// @icon            data:image/png;base64,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
// @author          seb-d59
// @version	        2.4
// @grant           none
// ==/UserScript==

var debug=false;
var WMESP_Version = GM_info.script.version;
var WMESP_OldVersion = WMESP_Version;
var WMESP_API = {};
WMESP_API.require = {};

var WMESP_Maj = {
	fr: "Mise à jour WME Split POI: v" + WMESP_Version + "\nCompatibilité New WME",
	en: "Update WME Split POI: v" + WMESP_Version + "\nCompatibility New WME"
	};

/* bootstrap, will call initialize() */
function WMESP_bootstrap(){
	log('Init');
	if (typeof(unsafeWindow) === "undefined"){
		unsafeWindow = ( function () {
			var dummyElem = document.createElement('p');
			dummyElem.setAttribute('onclick', 'return window;');
			return dummyElem.onclick();
		}) ();
	}
	/* begin running the code! */
	setTimeout(initialize, 1000);
}

//==========  Helper ==============================//
function getElementsByClassName(classname, node) {
  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for (var i=0,j=els.length; i<j; i++)
    if (re.test(els[i].className)) a.push(els[i]);
  return a;
}

function getId(node) {
	return document.getElementById(node);
}

function log(msg, obj)
{
    if (obj==null)
        console.log ("WME Split POI v" + WMESP_Version + " - " + msg);
    else if (debug)
        console.debug("WME Split POI v" + WMESP_Version + " - " + msg + " " ,obj);
  
}    
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function cloneObj(obj){
    var copy = JSON.parse(JSON.stringify(obj));
    return copy;
}

//==========  /Helper ==============================//

function WMESP_TestVersion() {

	if (typeof(localStorage.WMESPVersion) !== "undefined" && IsJsonString(localStorage.getItem('WMESPVersion'))) {
		WMESP_OldVersion=JSON.parse(localStorage.WMESPVersion);
  }else WMESP_OldVersion = "1.1";

  var locale = navigator.language.match(/fr|en/);
	var WMESPMaj = "";
		
	if(locale != null){
		switch(locale[0]) {
			case "fr":
				WMESPMaj=WMESP_Maj.fr;
				break;
			case "en":
				WMESPMaj=WMESP_Maj.en;
				break;
		}
	}else if(locale == null){
		WMESPMaj=WMESP_Maj.en;
	}
	log('WMESP_OldVersion ='+WMESP_OldVersion+'; WMESP_Version ='+WMESP_Version);
	if (WMESP_OldVersion != WMESP_Version) {
		alert(WMESPMaj);
		WMESP_OldVersion = WMESP_Version;
	}
  localStorage.setItem('WMESPVersion', JSON.stringify(WMESP_Version));
  

}

function initialize()
{
    log("init");
    initializeWazeObjects();   
    
}

function waitForObject(object)
{
    var obj=null;
    if (object.r==true)
    {
        if (debug) log ("eval: " + (object.s!=null?object.s:'dummy') + "="+ ((typeof(window.require)=="function")?"require":"WMESP_API.require") +"(\"" + object.o + "\")");
        eval ((object.s!=null?object.s:'dummy') + '=' + ((typeof(window.require)=="function")?'require':'WMESP_API.require') +'("' + object.o + '")');
        eval ("obj=" + (object.s!=null?object.s:'dummy'));
    		log("obj", obj);
    }else{
    
        if (debug) log ("eval: " + "typeof(unsafeWindow." + object.o.replace(/\//g, '.') + ")");
        obj=eval("typeof(unsafeWindow." + object.o.replace(/\//g, '.') + ")");
    }
    if(obj === "undefined")
    {
        log(object.o + ' KO');
        window.setTimeout(waitForObject.caller, 500);
        return false;
    }
    if (debug) log(object.s + ' OK');


    if (object.s!=null && object.r==false)
        eval (object.s + "=" + object.o.replace(/\//g, '.'));

    return true;



}


function initializeWazeObjects()
{
  var objectToCheck = [
      {o: "W",																s: "waze",														r: false},
      {o: "W.map",											      s: "wazeMap",                         r: false},
		  {o: "W.model",													s: "wazeModel",												r: false},
		  {o: "OL",													s: "wazeOL",													r: false},
		  {o: "W.loginManager",									s: "loginManager",										r: false},
		  {o: "W.selectionManager",							s: "selectionManager",								r: false},
		  {o: "W.loginManager.user",							s: "me",															r: false},
		  {o: "Waze/Action/UpdateObject",						s: "WazeActionUpdateObject",					r: true},
			{o: "Waze/Action/UpdateSegmentGeometry",  s: "WazeUpdateSegmentGeometry",       r: true},
      {o: "Waze/Action/UpdateFeatureAddress",		s: "WazeActionUpdateFeatureAddress",	r: true},
		  {o: "Waze/Action/DeleteObject",						s: "WazeActionDeleteObject", 					r: true},
		  {o: "Waze/Action/UpdateFeatureGeometry",	s: "WazeActionUpdateFeatureGeometry", r: true},
      {o: "Waze/Feature/Vector/Landmark",			  s: "WazefeatureVectorLandmark",       r: true},
      {o: "Waze/Action/CreateObject",						s: "WazeActionCreateObject",           r: true},
      {o: "Waze/Action/AddLandmark",						s: "WazeActionAddLandmark",           r: true},
      {o: "localStorage",										    s: null,                              r: false}
		  ];
 
	for (var i=0; i<objectToCheck.length; i++)
	{
			if (!waitForObject(objectToCheck[i])) return;    
	}
  
  
  initializeWazeUI();

}
        
function initializeWazeUI()
{

    var userInfo = getId('user-info');
    if (userInfo==null)
    {
        window.setTimeout(initializeWazeUI, 500);
        return;
    }

    var navTabs=userInfo.getElementsByTagName('ul');
    if (navTabs.length==0)
    {
        window.setTimeout(initializeWazeUI, 500);
        return;
    }
    if (typeof(navTabs[0])==='undefined')
    {
        window.setTimeout(initializeWazeUI, 500);
        return;
    }
    
    var tabContents=userInfo.getElementsByTagName('div');
    if (tabContents.length==0)
    {
        window.setTimeout(initializeWazeUI, 500);
        return;
    }
    if (typeof(tabContents[0])==='undefined')
    {
        window.setTimeout(initializeWazeUI, 500);
        return;
    }
    
    WMESP_TestVersion();
    
		selectionManager.events.register("selectionchanged", null, WMESP_newSelectionAvailable);
    
    log("init done.");
}

function WMESP_newSelectionAvailable()
{
    if (selectionManager.getSelectedFeatures().length !=1 )
        return;
    
    var selectedObject = selectionManager.getSelectedFeatures()[0].model;
    if (selectedObject.type!="venue")
        return;
    
    var attributes = selectedObject.attributes;
		
		if (!attributes.geometry.hasOwnProperty("components"))
		  return;
		
		if (!((attributes.categories == "NATURAL_FEATURES" ) || (attributes.categories == "ISLAND" ) || (attributes.categories == "SEA_LAKE_POOL") || (attributes.categories == "RIVER_STREAM" ) || (attributes.categories == "FOREST_GROVE") || (attributes.categories == "FARM" ) || (attributes.categories == "CANAL" ) || (attributes.categories == "SWAMP_MARSH" ) || (attributes.categories == "DAM" )))
		  return;
		log("selectionManager",selectionManager);
		
    var editPanel=getId('edit-panel');
    if (editPanel.firstElementChild.style.display=='none')
        window.setTimeout(WMESP_newSelectionAvailable, 100);
    
    // ok: 1 selected item and pannel is shown

    // On verifie que le segment est éditable
    if (!objIsEditable(selectedObject))
        return;
    
    if (selectedObject.type=="venue")
    {
        var item=getId("landmark-edit-general");
        //var attSection = getElementsByClassName("attributes-form side-panel-section", item);
   	    var btnGoogleGroup = getElementsByClassName("external-providers form-group",item);
        var parent = btnGoogleGroup[0].parentNode;
 
        var WMESP_Controle=document.createElement('Div');
        WMESP_Controle.id="WMESP-Controle";
        WMESP_Controle.className="form-group";
        WMESP_Controle.innerHTML+='<br><input type="button" id="_btnSplitPOI" class="action-button waze-btn waze-btn-white" value="Split POI"><br>';
		    parent.insertBefore(WMESP_Controle, btnGoogleGroup[0]);
        getId("_btnSplitPOI").onclick=SplitPOI;
    }
}


function onScreen(obj)
{
    if (obj.geometry)
    {
        return(wazeMap.getExtent().intersectsBounds(obj.geometry.getBounds()));
    }
    return false;
}

function objIsEditable(obj)
{
    if (obj==null) return false;
    if (loginManager.user.isCountryManager()) return true;
    
    if (obj.attributes.permissions == 0)
      return false;

    return true;
}

function SplitPOI()
{
    
    if (selectionManager.getSelectedFeatures().length !=1 )
        return;
    
    var poi = selectionManager.getSelectedFeatures()[0].model;
    if (poi.type!="venue") 
        return;
    
    var poiAttr = poi.attributes;
    
  	if (!poiAttr.geometry.components[0].hasOwnProperty("components"))
		  return;
		
		
		var poiPoints = [];
		var segPoints = [];

		log("poi",poi);
		log("poiAttr",poiAttr);
		for (var seg in wazeModel.segments.objects)
    {
      var segment = typeof(wazeModel.segments.getObjectById) == "function" ? wazeModel.segments.getObjectById(seg) : wazeModel.segments.get(seg);
      var segAttr = segment.attributes;
      if (segAttr.primaryStreetID==null)
      {
        if (onScreen(segment))
	      {
          var segLineString = segAttr.geometry.clone();
        }
      }
		}
		
		var poiGeo = poiAttr.geometry.clone();
		var oldPoiGeo = poiAttr.geometry.clone(); 
		var poiLineString = poiGeo.components[0].clone();
    
    var poiLine = new OpenLayers.Geometry.LinearRing();
    var segLine = new OpenLayers.Geometry.LinearRing();
   
    var intersectPoint = [];
    var intersectLine  = [];
    
    // Calcul des point d'intersection seg // poi
    for (var n=0; n < parseInt(poiLineString.components.length-1); n++)
    {
      poiLine.components["0"] = poiLineString.components[n].clone();
		  poiLine.components["1"] = poiLineString.components[n+1].clone();
      
      for (var m=0; m < parseInt(segLineString.components.length-1); m++)
      {
        segLine.components["0"] = segLineString.components[m].clone();
        segLine.components["1"] = segLineString.components[m+1].clone();
        if (poiLine.intersects(segLine))
        {
          intersectPoint.push({index: n, intersect: intersection(poiLine, segLine)});
        }
        segLine.removeComponent("0");
        segLine.removeComponent("1");
      }
      poiLine.removeComponent("0");
      poiLine.removeComponent("1");
    }
    log('intersectPoint= ',intersectPoint);
    // intégration des points au contour du POI avec memo du nouvel index
    var i=1;
    for (var n=0; n < intersectPoint.length; n++)
    {
      var point = intersectPoint[n].intersect;
      var index = parseInt(intersectPoint[n].index)+i;
      poiLineString.addComponent(point, index);
      intersectPoint[n].newIndex = index;
      i++;
    }
    
    // création des deux nouvelles géométries
    var TabLine1 = [];
    var TabLine2 = [];
    
    var index1 = parseInt(intersectPoint[0].newIndex);
    var index2 = parseInt(intersectPoint[1].newIndex);
    
    for (var n=0; n < parseInt(poiLineString.components.length); n++)
    {
      var x = poiLineString.components[n].x;
      var y = poiLineString.components[n].y;
      var point = new OpenLayers.Geometry.Point(x ,y);
		
      
      if (n < index1){
        TabLine1.push(point);

      }
      if (n == index1){
        TabLine1.push(point);
        TabLine2.push(point);
      }
      if ((index1 < n) && (n < index2)){
        TabLine2.push(point);
      }
      if (n == index2){
        TabLine1.push(point);
        TabLine2.push(point);
      }
      if (index2 < n){
        TabLine1.push(point);
      }
    }
    
    /*
    log('TabLine1['+0+']= ',TabLine1[0]);
    log('TabLine1['+(TabLine1.length-1)+']= ',TabLine1[(TabLine1.length-1)]);
    log('TabLine2['+0+']= ',TabLine2[0]);
    log('TabLine2['+(TabLine2.length-1)+']= ',TabLine2[(TabLine2.length-1)]);
    */
    //log('TabLine1= ',TabLine1);
    //log('TabLine2= ',TabLine2);
    
    var LineString1 = new OpenLayers.Geometry.LinearRing(TabLine1);
    var LineString2 = new OpenLayers.Geometry.LinearRing(TabLine2);
    log('LineString1= ',LineString1);
    log('LineString2= ',LineString2);
    
    poiGeo = new OpenLayers.Geometry.Polygon(LineString1);
    log('poiGeo = ',poiGeo);
            
    wazeModel.actionManager.add(new WazeActionUpdateFeatureGeometry(poi, Waze.model.venues,oldPoiGeo,poiGeo));
   
    
    // Création du nouveau poi
    clonePoi = new WazefeatureVectorLandmark();
    var clonePoiAttr = clonePoi.attributes;

    clonePoiAttr.adLocked = poi.attributes.adLocked;
    clonePoiAttr.aliases = poi.attributes.aliases;
    clonePoiAttr.approved = poi.attributes.approved;
    clonePoiAttr.categories = poi.attributes.categories;
    clonePoiAttr.description = poi.attributes.description;
    clonePoiAttr.externalProviderIDs = poi.attributes.externalProviderIDs;
    clonePoiAttr.houseNumber = poi.attributes.houseNumber;
    clonePoiAttr.openingHours = poi.attributes.openingHours;
    clonePoiAttr.lockRank = poi.attributes.lockRank;
    clonePoiAttr.name = poi.attributes.name;
    clonePoiAttr.residential = poi.attributes.residential;
    clonePoiAttr.phone = poi.attributes.phone;
    clonePoiAttr.services = poi.attributes.services;
    clonePoiAttr.url = poi.attributes.url;
    //clonePoiAttr.entryExitPoints = poi.attributes.entryExitPoints;
    //clonePoiAttr.images = poi.attributes.images;
    
    clonePoi.geometry = new OpenLayers.Geometry.Polygon(LineString2);

    log('clonePoi',clonePoi);
    
    wazeModel.actionManager.add(new WazeActionAddLandmark(clonePoi));
    
    // copie du nom et mise à jour du nouveau poi
    
    var street = wazeModel.streets.objects[poi.attributes.streetID];
    streetName = street.name;
    var cityID = street.cityID;
    var city = wazeModel.cities.objects[cityID];
    var stateID = wazeModel.cities.objects[cityID].attributes.stateID;
    var state = wazeModel.states.objects[stateID];
    var countryID = wazeModel.cities.objects[cityID].attributes.countryID;
    var country = wazeModel.countries.objects[countryID];
    
    if (!street.isEmpty || !city.attributes.isEmpty){ // nok 
    	var newAtts = { emptyStreet: true, stateID: stateID, countryID: countryID, cityName: city.attributes.name, streetName: streetName, emptyCity: true };
      log ('Natural feature POI: no street name and city');
      wazeModel.actionManager.add(new WazeActionUpdateFeatureAddress(poi, newAtts));
		}
		var street = wazeModel.streets.objects[clonePoi.attributes.streetID];
    streetName = street.name;
    var cityID = street.cityID;
    var city = wazeModel.cities.objects[cityID];
    var stateID = wazeModel.cities.objects[cityID].attributes.stateID;
    var state = wazeModel.states.objects[stateID];
    var countryID = wazeModel.cities.objects[cityID].attributes.countryID;
    var country = wazeModel.countries.objects[countryID];
    
    if (!street.isEmpty || !city.attributes.isEmpty){ // nok 
    	var newAtts = { emptyStreet: true, stateID: stateID, countryID: countryID, cityName: city.attributes.name, streetName: streetName, emptyCity: true };
      log ('Natural feature POI: no street name and city');
      wazeModel.actionManager.add(new WazeActionUpdateFeatureAddress(clonePoi, newAtts));
		}
		
    //log('wazeModel.actionManager = ',wazeModel.actionManager);

}
    
    
function intersection(D1, D2)
{
    var a,b,c,d,x,y;
    var seg = {}; //{x1, y1, x2, y2};
    var seg1 = {}; //{x1, y1, x2, y2};
    var seg2 = {}; //{x1, y1, x2, y2};
    var options = {};
    options.point = true;
    
    if (D1.components[0].x < D1.components[1].x)
    {
      seg1.x1 = D1.components[0].x;
      seg1.y1 = D1.components[0].y;
      seg1.x2 = D1.components[1].x;
      seg1.y2 = D1.components[1].y;
    }else if (D1.components[0].x > D1.components[1].x)
    {
      seg1.x1 = D1.components[1].x;
      seg1.y1 = D1.components[1].y;
      seg1.x2 = D1.components[0].x;
      seg1.y2 = D1.components[0].y;
    }
    
    if (D2.components[0].x < D2.components[1].x)
    {
      seg2.x1 = D2.components[0].x;
      seg2.y1 = D2.components[0].y;
      seg2.x2 = D2.components[1].x;
      seg2.y2 = D2.components[1].y;
    }else if (D2.components[0].x > D2.components[1].x)
    {
      seg2.x1 = D2.components[1].x;
      seg2.y1 = D2.components[1].y;
      seg2.x2 = D2.components[0].x;
      seg2.y2 = D2.components[0].y;
    }
    return OpenLayers.Geometry.segmentsIntersect(seg1,seg2,options);
          
   
}

if (typeof(window.require) == "function"){
  log("bootstrap classique");
  WMESP_bootstrap();
}else{
  ///////////////////////////////////////////////
  ///  Big thanks to dummyd2 for this Patch    //
  ///////////////////////////////////////////////
  log("load patch by dummyd2");

  // setup one global var and put all in
  var WMESPAPI = {};


  // detect URL of WME source code
  WMESPAPI.scripts = document.getElementsByTagName('script');
  WMESPAPI.url=null;
  for (i=0;i<WMESPAPI.scripts.length;i++)
  {
      if (WMESPAPI.scripts[i].src.indexOf('/assets-editor/js/app')!=-1)
      {
          WMESPAPI.url=WMESPAPI.scripts[i].src;
          break;
      }
  }
  if (WMESPAPI.url==null)
  {
      throw new Error("WME Hack: can't detect WME main JS");
  }



  // setup a fake require and require.define
  WMESPAPI.require=function (e) {
      return WMESPAPI.require.define.modules[e];
  };

  WMESPAPI.require.define=function (m) {
      if (WMESPAPI.require.define.hasOwnProperty('modules')==false)
          WMESPAPI.require.define.modules={};
      for (var p in m)
      {
          WMESPAPI.require.define.modules[p]=m[p];
      }
  };


  // save the original webpackJsonp function
  WMESPAPI.tmp = window.webpackJsonp;

  // taken from WME code: this function is a wrapper that setup the API and may call recursively other functions
  WMESPAPI.t = function (n) {
      if (WMESPAPI.s[n]) return WMESPAPI.s[n].exports;
      var r = WMESPAPI.s[n] = {
          exports: {},
          id: n,
          loaded: !1
      };
      return WMESPAPI.e[n].call(r.exports, r, r.exports, WMESPAPI.t), r.loaded = !0, r.exports;
  };

  // e is a copy of all WME funcs because function t need to access to this list
  WMESPAPI.e=[];

  // the patch
  window.webpackJsonp = function(a, i) {
      // our API but we will use it only to build the require stuffs
      var api={};
      // taken from WME code. a is [1], so...
      for (var o, d, u = 0, l = []; u < a.length; u++) d = a[u], WMESPAPI.r[d] && l.push.apply(l, WMESPAPI.r[d]), WMESPAPI.r[d] = 0;
      
      var unknownCount=0;
      var classname, funcStr;
      
      // copy i in e and keep a link from classname to index in e
      for (o in i)
      {
          WMESPAPI.e[o] = i[o];
          funcStr = i[o].toString();
          classname = funcStr.match(/CLASS_NAME:\"([^\"]*)\"/);
          if (classname)
          {
              // keep the link.
              api[classname[1].replace(/\./g,'/').replace(/^W\//, 'Waze/')]={index: o, func: WMESPAPI.e[o]};
          }
          else
          {
              api['Waze/Unknown/' + unknownCount]={index: o, func: WMESPAPI.e[o]};
              unknownCount++;
          }
          
      }
      
      // taken from WME code: it calls the original webpackJsonp and do something else, but I don't really know what.
      // removed the call to the original webpackJsonp: still works...
      //for (tmp && tmp(a, i); l.length;) l.shift().call(null, t);
      for (; l.length;) l.shift().call(null, WMESPAPI.t);
      WMESPAPI.s[0] = 0;
      
      // run the first func of WME. This first func will call recusrsively all funcs needed to setup the API.
      // After this call, s will contain all instanciables classes.
      //var ret = WMESPAPI.t(0);
      
      // now, build the requires thanks to the link we've built in var api.
      var module={};
      var apiFuncName;
      unknownCount=0;
      
      for (o in i)
      {
          funcStr = i[o].toString();
          classname = funcStr.match(/CLASS_NAME:\"([^\"]*)\"/);
          if (classname)
          {
              module={};
              apiFuncName = classname[1].replace(/\./g,'/').replace(/^W\//, 'Waze/');
              module[apiFuncName]=WMESPAPI.t(api[apiFuncName].index);
              WMESPAPI.require.define(module);
          }
          else
          {
              var matches = funcStr.match(/SEGMENT:"segment",/);
              if (matches)
              {
                  module={};
                  apiFuncName='Waze/Model/ObjectType';
                  module[apiFuncName]=WMESPAPI.t(api['Waze/Unknown/' + unknownCount].index);
                  WMESPAPI.require.define(module);
              }
              unknownCount++;
          }
      }
       

      // restore the original func
      window.webpackJsonp=WMESPAPI.tmp;

      // set the require public if needed
      // if so: others scripts must wait for the window.require to be available before using it.
      //window.require=WMESPAPI.require;
      WMESP_API.require=WMESPAPI.require;
      // all available functions are in WMESPAPI.require.define.modules
      // console.debug this variable to read it:
      //console.debug('WMESPAPI Modules: ', WMESPAPI.require.define.modules);
      
      // run your script here:
      setTimeout(WMESP_bootstrap, 1000);
      
      // again taken from WME code. Not sure about what it does.
      //if (i[0]) return ret;
  };

  // some kind of global vars and init
  WMESPAPI.s = {};
  WMESPAPI.r = {
      0: 0
  };

  // hacking finished

// load again WME through our patched func
WMESPAPI.WMEHACK_Injected_script = document.createElement("script");
WMESPAPI.WMEHACK_Injected_script.setAttribute("type", "application/javascript");
WMESPAPI.WMEHACK_Injected_script.src = WMESPAPI.url;
document.body.appendChild(WMESPAPI.WMEHACK_Injected_script);
}

