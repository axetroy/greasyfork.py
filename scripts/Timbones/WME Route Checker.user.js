// ==UserScript==
// @name                WME Route Checker
// @namespace           http://userscripts.org/users/419370
// @description         Allows editors to check the route between two segments
// @include             https://www.waze.com/*/editor*
// @include             https://www.waze.com/editor*
// @include             https://beta.waze.com/*
// @exclude             https://www.waze.com/*user/*editor/*
// @version             1.29
// @grant               none
// ==/UserScript==

// globals
var wmerc_version = "1.29";

var AVOID_TOLLS = 1;
var AVOID_FREEWAYS = 2;
var AVOID_DIRT = 4;
var ALLOW_UTURNS = 16;
var VEHICLE_TAXI = 64;
var VEHICLE_BIKE = 128;

var route_options = ALLOW_UTURNS; // default

var routeColors = ["#8309e1", "#52BAD9", "#888800" ];

var WMERC_lineLayer_route;

function showRouteOptions() {
  if (W.selectionManager.getSelectedFeatures().length != 2) {
    WMERC_lineLayer_route.destroyFeatures();
    WMERC_lineLayer_route.setVisibility(false);
    return;
  }

  if (getId('routeOptions') !== null) {
    return;
  }

  // hook into edit panel on the left
  var userTabs = getId('edit-panel');
  var segmentBox = getElementsByClassName('segment', userTabs)[0];
  var navTabs = getElementsByClassName('nav-tabs', segmentBox)[0];

  var routeTab = document.createElement('li');
  routeTab.innerHTML = '<a href="#route-checker" data-toggle="tab" id="route-tab-link">Routes</a>';
  navTabs.appendChild(routeTab);
  getId('route-tab-link').onclick = fetchRoute;

  var tabContent = getElementsByClassName('tab-content', segmentBox)[0];

  var routeContent = document.createElement('div');
  routeContent.id = 'route-checker';
  routeContent.className = 'tab-pane';
  tabContent.appendChild(routeContent);

  // add new edit tab to left of the map
  var routeOptions = document.createElement('div');
  routeOptions.id = "routeOptions";
  routeOptions.style.borderTop = "solid 2px #E9E9E9";
  routeOptions.style.borderBottom = "solid 2px #E9E9E9";
  routeContent.appendChild(routeOptions);

  var lang = I18n.translations[I18n.locale];

  if (location.hostname.match(/editor.*.waze.com/)) {
    var coords1 = getCoords(W.selectionManager.getSelectedFeatures()[0]);
    var coords2 = getCoords(W.selectionManager.getSelectedFeatures()[1]);
    var url = getLivemap()
            + "&from_lon="+coords1.lon + "&from_lat="+coords1.lat
            + "&to_lon="+coords2.lon + "&to_lat="+coords2.lat
            + "&at_req=0&at_text=Now";

    routeOptions.innerHTML = '<p><b><a href="'+url+'" title="Opens in new tab" target="LiveMap" style="color:#8309e1">Show routes in LiveMap</a> &raquo;</b></p>';
  } else {
    routeOptions.innerHTML = '<p><b><a href="#" id="goroutes" title="WME Route Checker v'+wmerc_version+'" style="color:#8309e1">'
                    + 'Show routes between these 2 segments</a> &raquo;</b><br>'
                    + '<b>'+lang.restrictions.editing.driving.dropdowns.vehicle_type+':</b>'
                    + ' <span style="white-space: nowrap;"><input type="radio" name="_vehicleType" id="_vehicleType_private" value="0" checked> '
                    + lang.restrictions.vehicle_types.PRIVATE + '</span>'
                    + ' <span style="white-space: nowrap;"><input type="radio" name="_vehicleType" id="_vehicleType_taxi" value="1"> '
                    + lang.restrictions.vehicle_types.TAXI + '</span>'
                    + ' <span style="white-space: nowrap;"><input type="radio" name="_vehicleType" id="_vehicleType_bike" value="1"> '
                    + lang.restrictions.vehicle_types.MOTORCYCLE + '</span>'
                    + '<br>'
                    + '<b>Avoid:</b>'
                    + ' <span style="white-space: nowrap;"><input type="checkbox" id="_avoidTolls" /> ' + lang.edit.segment.fields.toll_road + '</span>'
                    + ' <span style="white-space: nowrap;"><input type="checkbox" id="_avoidFreeways" /> ' + lang.segment.road_types[3] + '</span>'
                    + ' <span style="white-space: nowrap;"><input type="checkbox" id="_avoidDirt" /> ' + lang.edit.segment.fields.unpaved + '</span>'
                    + '<br>'
                    + '<b>Allow:</b>'
                    + ' <input type="checkbox" id="_allowUTurns" /> U-Turns</p>';

     getId('_avoidTolls').checked              = route_options & AVOID_TOLLS;
     getId('_avoidFreeways').checked           = route_options & AVOID_FREEWAYS;
     getId('_avoidDirt').checked               = route_options & AVOID_DIRT;
     getId('_allowUTurns').checked             = route_options & ALLOW_UTURNS;
     getId('_vehicleType_taxi').checked        = route_options & VEHICLE_TAXI;
     getId('_vehicleType_bike').checked        = route_options & VEHICLE_BIKE;

     // automatically start getting route when user clicks on link
     getId('goroutes').onclick = fetchRoute;
  }

  // create empty div ready for instructions
  var routeTest = document.createElement('div');
  routeTest.id = "routeTest";
  routeContent.appendChild(routeTest);

  return;
}

function saveOptions() {
  route_options = (getId('_avoidTolls').checked    ? AVOID_TOLLS    : 0)
                + (getId('_avoidFreeways').checked ? AVOID_FREEWAYS : 0)
                + (getId('_avoidDirt').checked     ? AVOID_DIRT     : 0)
                + (getId('_allowUTurns').checked   ? ALLOW_UTURNS   : 0)
                + (getId('_vehicleType_taxi').checked ? VEHICLE_TAXI : 0)
                + (getId('_vehicleType_bike').checked ? VEHICLE_BIKE : 0);

  console.log("WME Route Checker: saving options: " + route_options);
  localStorage.WMERouteChecker = JSON.stringify(route_options);
}

function getOptions() {
  var list = 'AVOID_TOLL_ROADS' + (route_options & AVOID_TOLLS    ? ':t' : ':f') + ','
           + 'AVOID_PRIMARIES'  + (route_options & AVOID_FREEWAYS ? ':t' : ':f') + ','
           + 'AVOID_TRAILS'     + (route_options & AVOID_DIRT     ? ':t' : ':f') + ','
           + 'ALLOW_UTURNS'     + (route_options & ALLOW_UTURNS   ? ':t' : ':f');
  return list;
}

function getCoords(segment) {
  var numpoints = segment.geometry.components.length;
  var middle = Math.floor(numpoints / 2);

  var seglat, seglon;
  if (numpoints % 2 == 1 || numpoints < 2) { // odd number, middle point
    seglat = segment.geometry.components[middle].y;
    seglon = segment.geometry.components[middle].x;
  }
  else { // even number - take average of middle two points
    seglat = (segment.geometry.components[middle].y
           +  segment.geometry.components[middle-1].y) / 2.0;
    seglon = (segment.geometry.components[middle].x
           +  segment.geometry.components[middle-1].x) / 2.0;
  }
  return OL.Layer.SphericalMercator.inverseMercator(seglon,seglat);
}

function fetchRoute(reverse) {
  saveOptions();

  var coords1, coords2;
  reverse = (reverse !== false);
  var selected = W.selectionManager.getSelectedFeatures();
  if (reverse) {
    coords1 = getCoords(selected[0]);
    coords2 = getCoords(selected[1]);
  } else {
    coords1 = getCoords(selected[1]);
    coords2 = getCoords(selected[0]);
  }

  var img = '<img src="https://www.waze.com/images/search_indicator.gif" hspace="4">';

  // get the route, fix and parse the json
  getId('routeTest').innerHTML = "<p><b>Fetching route from LiveMap " + img + "</b></p>";
  var url = getRoutingManager();
  var data = {
    from: "x:" + coords1.lon + " y:" + coords1.lat + " bd:true",
    to: "x:" + coords2.lon + " y:" + coords2.lat + " bd:true",
    returnJSON: true,
    returnGeometries: true,
    returnInstructions: true,
    type: 'HISTORIC_TIME',
    clientVersion: '4.0.0',
    timeout: 60000,
    nPaths: 3,
    options: getOptions()};

  if (route_options & VEHICLE_TAXI) {
    data.vehicleType = 'TAXI';
  }
  else if (route_options & VEHICLE_BIKE) {
    data.vehicleType = 'MOTORCYCLE';
  }
  //data.id = "beta";

  $.ajax({
    dataType: "json",
    url: url,
    data: data,
    dataFilter: function(data, dataType) {
      return data.replace(/NaN/g, '0');
    },
    success: function(json) {
      showNavigation(json, reverse);
    }
  });
  return false;
}

function getLivemap() {
  var center_lonlat=new OL.LonLat(W.map.center.lon,W.map.center.lat);
  center_lonlat.transform(new OL.Projection ("EPSG:900913"),new OL.Projection("EPSG:4326"));
  var coords = '?lon='+center_lonlat.lon+'&lat='+center_lonlat.lat;

  if (route_options & VEHICLE_TAXI) {
    coords += "&rp_vehicleType=TAXI";
  }
  else if (route_options & VEHICLE_BIKE) {
    coords += "&rp_vehicleType=MOTORCYCLE";
  }
  coords += "&rp_options=" + getOptions();

  return 'https://www.waze.com/livemap'+coords;
}

function getRoutingManager() {
  if (W.model.countries.getObjectById(235) || W.model.countries.getObjectById(40)) { // US & Canada
    return '/RoutingManager/routingRequest';
  } else if (W.model.countries.getObjectById(106)) { // Israel
    return '/il-RoutingManager/routingRequest';
  } else {
    return '/row-RoutingManager/routingRequest';
  }
}

function plotRoute(coords, index) {
  var points = [];
  for (var i in coords) {
    if (i > 0) {
      var point = OL.Layer.SphericalMercator.forwardMercator(coords[i].x, coords[i].y);
      points.push(new OL.Geometry.Point(point.lon,point.lat));
    }
  }
  var newline = new OL.Geometry.LineString(points);

  var style = {
    strokeColor: routeColors[index],
    strokeOpacity: 0.7,
    strokeWidth: 8 - index * 2,
  };
  var lineFeature = new OL.Feature.Vector(newline, {type: "routeArrow"}, style);

  // Display new segment
  WMERC_lineLayer_route.addFeatures([lineFeature]);
}

function showNavigation(nav_json, reverse) {
  WMERC_lineLayer_route.destroyFeatures();
  WMERC_lineLayer_route.setVisibility(true);

  // hide segment details
  var userTabs = getId('edit-panel');
  var segmentBox = getElementsByClassName('segment', userTabs)[0];
  var tabContent = getElementsByClassName('tab-content', segmentBox)[0];

  // write instructions
  var instructions = getId('routeTest');
  instructions.innerHTML = '';
  instructions.style.display = 'block';
  instructions.style.height = document.getElementById('map').style.height;

  var nav_coords;
  if (typeof nav_json.alternatives !== "undefined") {
    for (var r = 0; r < nav_json.alternatives.length; r++) {
      showInstructions(instructions, nav_json.alternatives[r], r);
      plotRoute(nav_json.alternatives[r].coords, r);
    }
    nav_coords = nav_json.alternatives[0].coords;
  } else {
    showInstructions(instructions, nav_json, 0);
    plotRoute(nav_json.coords, 0);
    nav_coords = nav_json.coords;
  }
  var lon1 = nav_coords[0].x;
  var lat1 = nav_coords[0].y;

  var end = nav_coords.length - 1;
  var lon2 = nav_coords[end].x;
  var lat2 = nav_coords[end].y;

  var rerouteArgs = '{lon:'+lon1+',lat:'+lat1+'},{lon:'+lon2+',lat:'+lat2+'}';

  // footer for extra links
  var footer = document.createElement('div');
  footer.className = 'routes_footer';

  // create link to reverse the route
  var reverseLink = document.createElement('a');
  reverseLink.innerHTML = '&#8646; Reverse Route';
  reverseLink.href = '#';
  reverseLink.setAttribute('onClick', 'fetchRoute('+!reverse+');');
  reverseLink.addEventListener('click', function() { fetchRoute(!reverse); }, false);
  footer.appendChild(reverseLink);

  footer.appendChild(document.createTextNode(' | '));

  var url = getLivemap()
          + "&from_lon="+lon1 + "&from_lat="+lat1
          + "&to_lon="+lon2 + "&to_lat="+lat2
          + "&at_req=0&at_text=Now";

  // create link to view the navigation instructions
  var livemapLink = document.createElement('a');
  livemapLink.innerHTML = 'View in LiveMap &raquo;';
  livemapLink.href = url;
  livemapLink.target="LiveMap";
  footer.appendChild(livemapLink);

  footer.appendChild(document.createElement('br'));

  // add link to script homepage and version
  var scriptLink = document.createElement('a');
  scriptLink.innerHTML = 'WME Route Checker v' + wmerc_version;
  scriptLink.href = 'https://www.waze.com/forum/viewtopic.php?t=64777';
  scriptLink.style.fontStyle = 'italic';
  scriptLink.target="_blank";
  footer.appendChild(scriptLink);

  instructions.appendChild(footer);

  return false;
}

function showInstructions(instructions, nav_json, r) {
  // for each route returned by Waze...
  var route = nav_json.response;
  var streetNames = route.streetNames;

  if (r > 0) { // divider
    instructions.appendChild(document.createElement('p'));
  }

  // name of the route, with coloured icon
  var route_name = document.createElement('p');
  route_name.className = 'route';
  route_name.style.borderColor = routeColors[r];
  route_name.innerHTML = '<b style="color:'+routeColors[r]+'">Via ' + route.routeName + '</b>';
  instructions.appendChild(route_name);

  if (route.tollMeters > 0) {
    route_name.innerHTML = '<span style="float: right">TOLL</span>' + route_name.innerHTML;
  }

  var optail = '';
  var prevStreet = '';
  var currentItem = null;
  var totalDist = 0;
  var totalTime = 0;
  //var detourSaving = 0;

  // street name at starting point
  var streetName = streetNames[route.results[0].street];
  var departFrom = 'depart';
  if (!streetName || streetName === null) {
    streetName = '';
  }
  else {
    departFrom = 'depart from ' + streetName;
    streetName = ' from <span style="color: blue">' + streetName + '<span>';
  }

  // turn icon at starting coordinates
  if (r === 0) {
    addTurnImageToMap(nav_json.coords[0], getTurnImage('FORWARD'), departFrom);
  }

  // add first instruction (depart)
  currentItem = document.createElement('a');
  currentItem.className = 'step';
  currentItem.innerHTML = getTurnImageSrc(getTurnImage('FORWARD')) + 'depart' + streetName;
  instructions.appendChild(currentItem);

  var segments = [];
  // iterate over all the steps in the list
  for (var i = 0; i < route.results.length; i++) {
    totalDist += route.results[i].length;
    totalTime += route.results[i].crossTime;
    //detourSaving += route.results[i].detourSavings;

    segments.push(route.results[i].path.segmentId);

    if (!route.results[i].instruction) {
      continue;
	}
    var opcode = route.results[i].instruction.opcode;
    if (!opcode) {
      continue;
	}

    // ignore these
    if (opcode.match(/ROUNDABOUT_EXIT|NONE/)) {
      continue;
    }

    // the image for the turn
    var dirImage = getTurnImage(opcode);
    var dirImageSrc = '';
    if (dirImage !== '') {
      dirImageSrc = '';
    }

    // the name that TTS will read out (in blue)
    streetName = getNextStreetName(route.results, i, route.streetNames);

    // roundabouts with nth exit instructions
    if (opcode == 'ROUNDABOUT_ENTER') {
      opcode += route.results[i].instruction.arg + 'th exit';
      opcode = opcode.replace(/1th/, '1st');
      opcode = opcode.replace(/2th/, '2nd');
      opcode = opcode.replace(/3th/, '3rd');
    }

    // convert opcode to pretty text
    opcode = opcode.replace(/APPROACHING_DESTINATION/, 'arrive');
    opcode = opcode.replace(/ROUNDABOUT_(EXIT_)?LEFT/, 'at the roundabout, turn left');
    opcode = opcode.replace(/ROUNDABOUT_(EXIT_)?RIGHT/, 'at the roundabout, turn right');
    opcode = opcode.replace(/ROUNDABOUT_(EXIT_)?STRAIGHT/, 'at the roundabout, continue straight');
    opcode = opcode.replace(/ROUNDABOUT_ENTER/, 'at the roundabout, take ');
    opcode = opcode.toLowerCase().replace(/_/, ' ');
    opcode = opcode.replace(/uturn/, 'make a U-turn');
    opcode = opcode.replace(/roundabout u/, 'at the roundabout, make a U-turn');

    // convert keep to exit if needed
    var keepSide = W.model.isLeftHand ? /keep left/ : /keep right/;
    if (opcode.match(keepSide) && i+1 < route.results.length &&
        isKeepForExit(route.results[i].roadType, route.results[i+1].roadType)) {
      opcode = opcode.replace(/keep (.*)/, 'exit $1');
    }

    // show turn symbol on the map (for first route only)
    if (r === 0) {
	  var title;
      if (opcode == 'arrive') {
        var end = nav_json.coords.length - 1;
        title = 'arrive at ' + (streetName !== '' ? streetName : 'destination');
        addTurnImageToMap(nav_json.coords[end], dirImage, title);
      } else {
        title = opcode.replace(/at the roundabout, /, '');
        if (streetName !== '') title += ' onto ' + streetName;
        addTurnImageToMap(route.results[i+1].path, dirImage, title);
      }
    }

    // pretty street name
    if (streetName !== '') {
      if (opcode == 'arrive') {
        streetName = ' at <span style="color: blue">' + streetName + '</span>';
      } else {
        streetName = ' onto <span style="color: blue">' + streetName + '</span>';
      }
    }

    // display new instruction
    currentItem = document.createElement('a');
    currentItem.className = 'step';
    currentItem.innerHTML = getTurnImageSrc(dirImage) + opcode + streetName;
    if (opcode.match(/0th exit/)) {
      currentItem.style.color = 'red';
    }
    instructions.appendChild(currentItem);
  }

  // append distance and time to last instruction
  currentItem.title = (totalDist/1609).toFixed(3) + " miles";
  currentItem.innerHTML += ' - ' + totalDist/1000 + ' km';
  currentItem.innerHTML += ' - ' + timeFromSecs(totalTime);
  //if (detourSaving > 0) {
  //  currentItem.innerHTML += '<br>&nbsp; <i>detour saved ' + timeFromSecs(detourSaving) + '</i>';
  //}

  var selectAll = document.createElement('a');
  selectAll.className = 'step select';
  selectAll.innerHTML = 'Select route segments &#8605;';
  selectAll.href = "#";
  selectAll.addEventListener('click', function() { selectSegmentIDs(segments); }, false);
  instructions.appendChild(selectAll);
}

function selectSegmentIDs(segments) {
  var objects = [];
  for (var i = 0; i < segments.length; i++) {
	var segment = W.model.segments.objects[segments[i]];
	if (typeof segment != 'undefined') {
	  objects.push(segment);
	}
  }
  W.selectionManager.setSelectedModels(objects);
  return false;
}

function getNextStreetName(results, index, streetNames) {
  var streetName = '';
  var unnamedCount = 0;
  var unnamedLength = 0;

  // destination
  if (index == results.length-1) {
    streetName = streetNames[results[index].street];
    if (!streetName || streetName === null) {
      streetName = '';
	}
  }

  // look ahead to next street name
  while (++index < results.length && streetName === '') {
    streetName = streetNames[results[index].street];
    if (!streetName || streetName === null) {
      streetName = '';
	}

    // "Navigation instructions for unnamed segments" <- in the Wiki
    if (streetName === '' && !isFreewayOrRamp(results[index].roadType)
		&& !isRoundabout(results[index].path.segmentId)) {
      unnamedLength += length;
      unnamedCount++;
      if (unnamedCount >= 4 || unnamedLength >= 400) {
        //console.log("- unnamed segments too long; break");
        break;
      }
    }
  }

  return streetName;
}

function getTurnImage(opcode) {
  var dirImage = '';
  if (W.model.countries.top.leftHandTraffic) {
    opcode = opcode.replace(/(ROUNDABOUT_)(EXIT_)?/, "$1UK_");
  }
  switch (opcode) {
    case "CONTINUE":
    case "NONE":        dirImage = "big_direction_forwardc0958c4d4c5c79bcb656d34f3afb3ea2"; break;
    case "TURN_LEFT":   dirImage = "big_direction_left5b94fa33f945d46ab1bdd1131ac0457e"; break;
    case "TURN_RIGHT":  dirImage = "big_direction_right2d403871f04763260a40c537e231897e"; break;
    case "KEEP_LEFT":
    case "EXIT_LEFT":   dirImage = "big_direction_exit_left1c1498a6dec9582bae81d34ec9e6dc3b"; break;
    case "KEEP_RIGHT":
    case "EXIT_RIGHT":  dirImage = "big_direction_exit_rightba4fee1380f556a8570252c6745f1442"; break;
    case "UTURN":       dirImage = "big_direction_u63cf785b68a57e8663020098cd07ed76"; break;
    case "APPROACHING_DESTINATION":   dirImage = "big_direction_end25226c71aed0efd3a2db41978066febc"; break;
    case "ROUNDABOUT_LEFT":
    case "ROUNDABOUT_EXIT_LEFT":      dirImage = "big_directions_roundabout_l54dc48b91e36549b26bae30135462780"; break;
    case "ROUNDABOUT_UK_LEFT":        dirImage = "big_directions_roundabout_UK_ldc86a0b99cfcd4ed03b0192d5b350c70"; break;
    case "ROUNDABOUT_RIGHT":
    case "ROUNDABOUT_EXIT_RIGHT":     dirImage = "big_directions_roundabout_rc114740b6cafc42177a53aa6c803c14d"; break;
    case "ROUNDABOUT_UK_RIGHT":       dirImage = "big_directions_roundabout_r_UKc34794c4d01ec8a9fa012150d2f1e02a"; break;
    case "ROUNDABOUT_STRAIGHT":
    case "ROUNDABOUT_EXIT_STRAIGHT":  dirImage = "big_directions_roundabout_sffadf4fd7b277b8ef2f21688e79b9351"; break;
    case "ROUNDABOUT_UK_STRAIGHT":    dirImage = "big_directions_roundabout_UK_s01ea5c47f4e08b20532505d84b3271e0"; break;
    case "ROUNDABOUT_ENTER":
    case "ROUNDABOUT_EXIT":           dirImage = "big_directions_roundabout9f9bf37022d431be50fecc457cd6e3df"; break;
    case "ROUNDABOUT_UK_ENTER":
    case "ROUNDABOUT_UK_EXIT":        dirImage = "big_directions_roundabout_UK7dce607d7359326a799fd9d3ad8542aa"; break;
    case "ROUNDABOUT_U":              dirImage = "big_directions_roundabout_u3634283a7d740f30eb18c203f6a357be"; break;
    case "ROUNDABOUT_UK_U":           dirImage = "big_directions_roundabout_u_UKba204c8a12885976f9bc5b07165b8644"; break;
    default: dirImage = '';
  }
  return dirImage;
}

function getTurnImageSrc(dirImage) {
  var imgRoot = 'https://editor-assets.waze.com/production/img/';
  if (dirImage !== '') {
    return '<img src="' + imgRoot + dirImage + '.png" style="float: left; top: 0; padding-right: 4px" width="16" height="16" />';
  }
  return '';
}

function isKeepForExit(fromType, toType) {
  // primary to non-primary
  if (isPrimaryRoad(fromType) && !isPrimaryRoad(toType)) {
    return true;
  }
  // ramp to non-primary or non-ramp
  if (isRamp(fromType) && !isPrimaryRoad(toType) && !isRamp(toType)) {
    return true;
  }
  return false;
}

function isFreewayOrRamp(t) {
  return t === 3 /*FREEWAY*/ || t === 4 /*RAMP*/;
}

function isPrimaryRoad(t) {
  return t === 3 /*FREEWAY*/ || t === 6 /*MAJOR_HIGHWAY*/ || t === 7 /*MINOR_HIGHWAY*/;
}

function isRamp(t) {
  return t === 4 /*RAMP*/;
}

function isRoundabout(id) {
  var segment = W.model.segments.getObjectById(id);
  if (typeof segment != "undefined") {
    return segment.attributes.junctionId !== null;
  }
  return false;
}

function timeFromSecs(seconds)
{
  var hh = '00'+Math.floor(((seconds/86400)%1)*24);
  var mm = '00'+Math.floor(((seconds/3600)%1)*60);
  var ss = '00'+Math.round(((seconds/60)%1)*60);
  return hh.slice(-2) + ':' + mm.slice(-2) + ':' + ss.slice(-2);
}

function addTurnImageToMap(location, image, title) {
  if (image === '') return;

  var coords = OL.Layer.SphericalMercator.forwardMercator(location.x, location.y);
  var point = new OL.Geometry.Point(coords.lon,coords.lat);
  var imgRoot = 'https://editor-assets.waze.com/production/img/';

  var style = {
    externalGraphic: imgRoot + image + ".png",
    graphicWidth: 30,
    graphicHeight: 32,
    label: title,
    labelXOffset: 20,
    labelAlign: 'l',
    labelOutlineColor: 'white',
    labelOutlineWidth: 3,
    fontWeight: 'bold',
    fontColor: routeColors[0]
  };

  if (title.match(/0th exit/)) {
    style.fontColor = 'red';
  }

  var imageFeature = new OL.Feature.Vector(point, null, style);

  // Display new segment
  WMERC_lineLayer_route.addFeatures([imageFeature]);
}

/* helper function */
function getElementsByClassName(classname, node) {
  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for (var i=0,j=els.length; i<j; i++) {
    if (re.test(els[i].className)) {
	  a.push(els[i]);
	}
  }
  return a;
}

function getId(node) {
  return document.getElementById(node);
}

function initialiseRouteChecker() {
  if (typeof W == 'undefined') {
    return; // not WME
  }

  console.log("WME Route Checker: initialising v" + wmerc_version);

  if (localStorage.WMERouteChecker) {
    route_options = JSON.parse(localStorage.WMERouteChecker);
    console.log("WME Route Checker: loaded options: " + route_options);
  }

  /* dirty hack to inject stylesheet in to the DOM */
  var style = document.createElement('style');
  style.innerHTML = "#routeTest {padding: 0 4px 0 0; overflow-y: auto;}\n"
                  + "#routeTest p.route {margin: 0; padding: 4px 8px; border-bottom: silver solid 3px; background: #eee}\n"
                  + "#routeTest a.step {display: block; margin: 0; padding: 3px 8px; text-decoration: none; color:black;border-bottom: silver solid 1px;}\n"
                  + "#routeTest a.step:hover {background: #ffd;}\n"
                  + "#routeTest a.step:active {background: #dfd;}\n"
                  + "#routeTest a.select {color: #00f; text-align: right}\n"
                  + "#routeTest div.routes_footer {text-align: center; margin-bottom: 25px;}\n";
  (document.body || document.head || document.documentElement).appendChild(style);

  // add a new layer for routes
  WMERC_lineLayer_route = new OL.Layer.Vector("Route Checker Script",
    { displayInLayerSwitcher: false,
      uniqueName: 'route_checker' }
  );
  W.map.addLayer(WMERC_lineLayer_route);

  // add listener for whenever selection changes
  W.selectionManager.events.register("selectionchanged", null, showRouteOptions);

  showRouteOptions(); // for permalinks
}

// bootstrap!
(function()
{
  setTimeout(initialiseRouteChecker, 1003);
})();

/* end ======================================================================= */