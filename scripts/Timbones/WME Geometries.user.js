// ==UserScript==
// @name                WME Geometries
// @version             1.4
// @description         Import geometry files into Waze Map Editor. Supports GeoJSON, GML, WKT, KML and GPX.
// @include             https://www.waze.com/*/editor*
// @include             https://www.waze.com/editor*
// @include             https://beta.waze.com/*
// @exclude             https://www.waze.com/*user/*editor/*
// @grant               none
// @author              Timbones
// @contributor         wlodek76
// @namespace           https://greasyfork.org/users/3339
// @run-at              document-idle
// ==/UserScript==
/*

    Blah Blah Blah

*/

var geometries = function()
{
  // maximum number of features that will be shown with labels
  var maxlabels = 2500;

  // show labels using first attribute that starts or ends with 'name' (case insensitive regexp)
  var labelname = /^name|name$/;

  // each loaded file will be rendered with one of these colours in ascending order
  var colorlist = [ "deepskyblue", "magenta", "limegreen", "orange", "teal", "grey" ];

  // -------------------------------------------------------------
  var geolist;

  var formathelp = 'GeoJSON, WKT';
  var formats = { 'GEOJSON':new OL.Format.GeoJSON(),
                  'WKT':new OL.Format.WKT() };
  patchOpenLayers();  // patch adds KML, GPX and TXT formats

  var EPSG_4326 = new OL.Projection("EPSG:4326");  // lat,lon
  var EPSG_4269 = new OL.Projection("EPSG:4269");  // NAD 83
  var EPSG_3857 = new OL.Projection("EPSG:3857");  // WGS 84

  var layerindex = 0;

  // delayed initialisation
  setTimeout(init, 1654);

  // add interface to Settings tab
  function init()
  {
    if (typeof W.loginManager != 'undefined' && !W.loginManager.isLoggedIn()) {
      W.loginManager.events.register("login", null, init);
      return;
    }

    var geobox = document.createElement('div');
    geobox.style.paddingTop = '6px';

    console.log("WME Geometries: Initialising for Editor");
    $("#sidepanel-areas").append(geobox);

    var geotitle = document.createElement('h4');
    geotitle.innerHTML = 'Import Geometry File';
    geobox.appendChild(geotitle);

    geolist = document.createElement('ul');
    geobox.appendChild(geolist);

    var geoform = document.createElement('form');
    geobox.appendChild(geoform);

    var inputfile = document.createElement('input');
    inputfile.type = 'file';
    inputfile.id = 'GeometryFile';
    inputfile.title = '.geojson, .gml or .wkt';
    inputfile.addEventListener('change', addGeometryLayer, false);
    geoform.appendChild(inputfile);

    var notes = document.createElement('p');
    notes.innerHTML = '<b>Formats:</b> ' + formathelp + '<br> '
                    + '<b>Coordinates:</b> EPSG:4326, EPSG:3857';
    geoform.appendChild(notes);

    var inputadd = document.createElement('input');
    inputadd.type = 'button';
    inputadd.value = 'Clear All';
    inputadd.onclick = removeGeometryLayers;
    geoform.appendChild(inputadd);

    console.log("WME Geometries initialised");
  }

  // import selected file as a vector layer
  function addGeometryLayer() {
    // get the selected file from user
    var fileList = document.getElementById('GeometryFile');
    file = fileList.files[0];
    fileList.value = '';

    var fileext = file.name.split('.').pop();
    var filename = file.name.replace('.' + fileext, '');
    fileext = fileext.toUpperCase();

    // add list item
    color = colorlist[(layerindex++) % colorlist.length];
    var fileitem = document.createElement('li');
    fileitem.id = file.name;
    fileitem.style.color = color;
    fileitem.innerHTML = 'Loading...';
    geolist.appendChild(fileitem);

    // check if format is supported
    var parser = formats[fileext];
    if (typeof parser == 'undefined') {
       fileitem.innerHTML = fileext.toUpperCase() + ' format not supported :(';
       fileitem.style.color = 'red';
       return;
    }
    parser.internalProjection = W.map.getProjectionObject();
    parser.externalProjection = EPSG_4326;

    // add a new layer for the geometry
    var layerid = 'wme_geometry_'+layerindex;
    var WME_Geometry = new OL.Layer.Vector("Geometry: " + filename,
      { rendererOptions: { zIndexing: true },
        uniqueName: layerid,
        shortcutKey: "S+" + layerindex,
        layerGroup: 'wme_geometry'
      }
    );

    var layerStyle = {
      strokeColor: color,
      strokeOpacity: 0.75,
      strokeWidth: 3,
      fillColor: color,
      fillOpacity: 0.1,
      pointRadius: 6,
      fontColor: 'white',
      labelOutlineColor: color,
      labelOutlineWidth: 4,
      labelAlign: 'left'
    };
    WME_Geometry.setZIndex(-9999);
    WME_Geometry.displayInLayerSwitcher = true;

    // hack in translation:
    I18n.translations[I18n.locale].layers.name[layerid] = "WME Geometries: " + filename;

    // read the file into the new layer
    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        if (/"EPSG:3857"|:EPSG::3857"/.test(e.target.result)) {
          parser.externalProjection = EPSG_3857;
        }
        else if (/"EPSG:4269"|:EPSG::4269"/.test(e.target.result)) {
          parser.externalProjection = EPSG_4269;
        }

        // load geometry files
        var features = parser.read(e.target.result);

        // detect bad data
        if (features.length === 0) {
           fileitem.innerHTML = 'No features loaded :(';
           fileitem.style.color = 'red';
           WME_Geometry.destroy();
		   return;
        }

        // check which attribute can be used for labels
        var labelwith = '(no labels)';
        if (features.length <= maxlabels) {
            for (var attrib in features[0].attributes) {
                if (labelname.test(attrib.toLowerCase()) === true) {
                    if (typeof features[0].attributes[attrib] == 'string') {
                        labelwith = 'Labels: ' + attrib;
                        layerStyle.label = '${'+attrib+'}';
                        break;
                    }
                }
            }
        }
        WME_Geometry.styleMap = new OL.StyleMap(layerStyle);

        // add data to the map
        WME_Geometry.addFeatures(features);
        W.map.addLayer(WME_Geometry);

        fileitem.innerHTML = filename;
        fileitem.title = fileext.toUpperCase() + " " + parser.externalProjection.projCode
                       + ": " + features.length + " features loaded\n" + labelwith;

        console.log("WME Geometries: Loaded " + fileitem.title);
      };
    })(file);

    reader.readAsText(file);
  }

  // clear all
  function removeGeometryLayers() {
    var layers = W.map.getLayersBy("layerGroup","wme_geometry");
    for (i = 0; i < layers.length; i++) {
      layers[i].destroy();
    }
    geolist.innerHTML = '';
    layerindex = 0;
    return false;
  }

  // ------------------------------------------------------------------------------------

  // replace missing functions in OpenLayers 2.13.1
  function patchOpenLayers() {
    if (!OL.VERSION_NUMBER.match(/^Release [0-9.]*$/)) {
      console.log("WME Geometries: OpenLayers version mismatch ("+ OL.VERSION_NUMBER+") - cannot apply patch");
      return;
    }

    loadOLScript("lib/OpenLayers/Format/KML", function() {formats.KML = new OL.Format.KML(); formathelp += ", KML";} );
    loadOLScript("lib/OpenLayers/Format/GPX", function() {formats.GPX = new OL.Format.GPX(); formathelp += ", GPX";} );
    loadOLScript("lib/OpenLayers/Format/GML", function() {formats.GML = new OL.Format.GML(); formathelp += ", GML";} );
  }
};
// ------------------------------------------------------------------------------------

// https://cdnjs.com/libraries/openlayers/x.y.z/
function loadOLScript(filename, callback) {
  var version = OL.VERSION_NUMBER.replace(/Release /, '');
  console.log("Loading openlayers/"+ version + "/" + filename + ".js");

  var openlayers = document.createElement('script');
  openlayers.src = "https://cdnjs.cloudflare.com/ajax/libs/openlayers/" + version + "/" + filename + ".js";
  openlayers.type = "text/javascript";
  openlayers.onload = callback;
  document.head.appendChild(openlayers);
}

window.onload = geometries;

// ------------------------------------------------------------------------------------
