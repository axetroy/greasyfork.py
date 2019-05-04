   // ==UserScript==
// @name                WME Russian States Overlay
// @namespace           https://greasyfork.org/ru/users/26908-aleksey-shabunin
// @description         Polygons regions of the Russia
// @include             https://www.waze.com/*/editor*
// @include             https://www.waze.com/editor*
// @include             https://beta.waze.com/*
// @exclude             https://www.waze.com/*user/*editor/*
// @version             1.24
// @grant               none
// @copyright           2016 coilamo
// ==/UserScript==


//---------------------------------------------------------------------------------------


var RSO_qty=4;
var RSO_debug=false;
var RSO_ll;
var states_info = [];
var _settingsStoreName = '_wme_rso';
var _settings;
var colors = ['#FF0000', '#0000FF', '#FFFF00', '#FFAA00', '#800000', '#800080', '#000080', '#008080'];
var addedPolygons = [];

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function GetLatLonZoom(){
    var urPos=new OpenLayers.LonLat(Waze.map.center.lon,Waze.map.center.lat);
    urPos.transform(new OpenLayers.Projection("EPSG:900913"),new OpenLayers.Projection("EPSG:4326"));
    return {
        lat: urPos.lat,
        lon: urPos.lon,
        zoom: Waze.map.zoom
    };
}

function changeLayer(state_mapLayer)
{
	localStorage.statusStateLayers = state_mapLayer.getVisibility();
    if(localStorage.statusStateLayers == "true") {
        $('#states-list').css('display', 'block');
    } else {
        $('#states-list').css('display', 'none');
    }
}

function ShowInfo(data){
    var html='';
    $('#states-list').html("");
    //console.log('data', data);

    var dups = [];
    var arr = data.filter(function(el) {
        // If it is not a duplicate, return true
        if (dups.indexOf(el.state_1) == -1) {
            dups.push(el.state_1);
            return true;
        }

        return false;
    });

    arr.forEach(function(state, j) {
        states_info.forEach(function(state_color, i) {
            var statename = (state['state_2'] != undefined) ? state['state_1'] + ', ' + state['state_2'] : state['state_1'];
            if(state_color.state == statename)
                //if(state_color.rules !== '') alert(state_color.rules);
                html += '<span style="margin:2px;display:inline-block;line-height:25px;width:25px;background-color:' + state_color.color + ';">&nbsp;</span> <span style="margin:2px;display:inline-block;line-height:25px;">' + state_color.state + '</span><br>';
        });
    });

    if(html !== '') $('#states-list').html(html);
    else $('#states-list').html('<span style="display:inline-block;line-height:28px;">В этой области нет видимых штатов. Пожалуйста, обновите страницу браузера.</span>');
}

function AddPolygon(stateLayer,groupPoints,groupColor,groupNumber){
    //console.log('addPolygon');
    var mro_Map = Waze.map;
    var mro_OL = OpenLayers;
    var stateGroupLabel = groupNumber;
    var groupName = groupNumber;
    
    var style = {
        strokeColor: groupColor,
        strokeOpacity: 1,
        strokeWidth: 4,
        strokeDashstyle: "dash",
        fillColor: groupColor,
        fillOpacity: 0.15,
        label: stateGroupLabel,
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
    stateLayer.addFeatures([feature]);

}

function InitRussianStateOverlay(){
    console.log('InitRussianStateOverlay');

    var RSO_states_list = document.createElement('div');
    RSO_states_list.id = "states-list";
    RSO_states_list.style.backgroundColor = "#fff";
    RSO_states_list.style.position = "fixed";
    RSO_states_list.style.bottom = "28px";
    RSO_states_list.style.right = "82px";
    RSO_states_list.style.margin = "4px";
    document.getElementById('editor-container').appendChild(RSO_states_list);

    var mro_Map = Waze.map;
    var mro_OL = OpenLayers;

    if (!mro_Map) return;
	
    if (!mro_OL) return;

    //I18n.translations[window.I18n.locale].layers.name.russianstates = "Russian states";

    //var mro_mapLayers = mro_Map.getLayersBy("uniqueName","russianstates");

    var state_mapLayer = new mro_OL.Layer.Vector("Russian states", {
        displayInLayerSwitcher: true,
        uniqueName: "russianstates"
    });


    mro_Map.addLayer(state_mapLayer);
    if (localStorage.statusStateLayers == "true") {
        state_mapLayer.setVisibility(true);
        $('#states-list').css('display', 'block');
    } else {
        state_mapLayer.setVisibility(false);
        $('#states-list').css('display', 'none');
    }

    var displayGroupSelector = document.getElementById('layer-switcher-group_display');
    if (displayGroupSelector != null) {
        var roadGroup = displayGroupSelector.parentNode.parentNode.querySelector('.children');
        var toggler = document.createElement('li');
        var togglerContainer = document.createElement('div');
        togglerContainer.className = 'controls-container toggler';
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'layer-switcher-item_russian-states';
        checkbox.className = 'toggle';
        checkbox.checked = state_mapLayer.getVisibility();
        checkbox.addEventListener('click', function(e) {
            state_mapLayer.setVisibility(e.target.checked);
            if(e.target.checked) {
                $('#states-list').css('display', 'block');
            } else {
                $('#states-list').css('display', 'none');
            }
        });
        togglerContainer.appendChild(checkbox);
        var label = document.createElement('label');
        label.htmlFor = checkbox.id;
        var labelText = document.createElement('span');
        labelText.className = 'label-text';
        labelText.appendChild(document.createTextNode('Russian states'));
        label.appendChild(labelText);
        togglerContainer.appendChild(label);
        toggler.appendChild(togglerContainer);
        roadGroup.appendChild(toggler);
    }


    drawState(state_mapLayer);
    Waze.map.events.register("changelayer", null, function(){changeLayer(state_mapLayer);});
    Waze.map.events.register("zoomout", null, function(){drawState(state_mapLayer);});
    Waze.map.events.register("zoomin", null, function(){drawState(state_mapLayer);});
    Waze.map.events.register("moveend", null, function(){drawState(state_mapLayer);});
   
}

function drawState(state_mapLayer) {
    if(state_mapLayer.getVisibility()) {
        //console.log('drawState');
        RSO_ll=GetLatLonZoom();
        var states='';
        Waze.model.states.additionalInfo.forEach(function(item) {
            states += item.id + ' ';
        });
        states = states.trim().replace(/\s+/g, ',');
        $.ajax({
            url:"https://bobalus.ru/api/get-polygons-dev.php?polygons="+states
        }).done(function(data){
            //console.log('addedPolygon', addedPolygons);
            data.forEach(function(polygon) {
                //console.log('state_1', polygon['state_1']);
                if(addedPolygons.indexOf( polygon['state_1'] ) == -1) {
                    var i = addedPolygons.length;
                    addedPolygons.push(polygon['state_1']);
                    states_info.push({"state":(polygon['state_2'] !== undefined) ? polygon['state_1'] + ', ' + polygon['state_2'] : polygon['state_1'], "color":colors[i%8], "rules":polygon['local_rules']});
                    AddPolygon(state_mapLayer, polygon['coords'], colors[i%8], (RSO_debug ? i+". "+polygon['state_1']+' / #'+colors[i%8] : polygon['state_1']));
                }
            });
            ShowInfo(data);
            //console.log('addedPolygons ', addedPolygons);
        });
    }
}

setTimeout(InitRussianStateOverlay, 2000);