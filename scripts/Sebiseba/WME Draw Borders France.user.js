// ==UserScript==
// @name         WME Draw Borders France
// @namespace    Sebiseba
// @version      0.26
// @description  Affiche les limites des villes et départements français
// @include      https://www.waze.com/editor*
// @include      https://www.waze.com/*/editor*
// @include      https://beta.waze.com/*
// @exclude      https://www.waze.com/user/*editor/*
// @exclude      https://www.waze.com/*/user/*editor/*
// @author       Sebiseba
// @copyright    Sebiseba 2017 (Inspired by Draw Border - ©giovanni-cortinovis)
// @grant        unsafeWindow
// @grant	     GM_xmlhttpRequest
// @connect      wmebookmarks.free.fr
// @connect      radars.securite-routiere.gouv.fr

// ==/UserScript==
/* jshint -W097 */
'use strict';

// **********************************
// **  DOWNLOAD HELPER BY DUMMYD2  **
// **********************************

/******** AUTO INJECTED PART ***************/

function DBFdownloadHelperInjected()
{
    window.WMEDBFDownloadHelper = {
        jobs: [],
        _waitForData: function (id)
        {
            if (this.jobs.length<=id)
            {
                this.jobs[id].callback({url: null, data: null, callback: this.jobs[id].callback, status: "error", error: "Request not found"});
            }
            else
            {
                if (this.jobs[id].status=="success" || this.jobs[id].status=="error")
                    this.jobs[id].callback(this.jobs[id]);
                else
                {
                    if (this.jobs[id].status=="downloading" && this.jobs[id].progressCallback)
                    {
                        this.jobs[id].progressCallback(this.jobs[id]);
                    }
                    var _this=this;
                    window.setTimeout(function () { _this._waitForData(id); }, 500);
                }
            }
        },
        add: function (params, callback, progressCallback)
        {

            this.jobs.push({params: params, data: null, callback: callback, progressCallback: progressCallback, status: "added", progression: 0, error: ""});
            var id = this.jobs.length-1;
            var _this=this;
            window.setTimeout(function () { _this._waitForData(id); }, 500);
        }
    };
}
var DBFdownloadHelperInjectedScript = document.createElement("script");
DBFdownloadHelperInjectedScript.textContent = '' + DBFdownloadHelperInjected.toString() + ' \n' + 'DBFdownloadHelperInjected();';
DBFdownloadHelperInjectedScript.setAttribute("type", "application/javascript");
document.body.appendChild(DBFdownloadHelperInjectedScript);

/******** SANDBOX PART ***************/
function DBFlookFordownloadHelperJob()
{
    for (var i=0; i<unsafeWindow.WMEDBFDownloadHelper.jobs.length; i++)
    {
        if (unsafeWindow.WMEDBFDownloadHelper.jobs[i].status=="added")
        {
            unsafeWindow.WMEDBFDownloadHelper.jobs[i].status = cloneInto( "downloading", unsafeWindow.WMEDBFDownloadHelper.jobs[i]);

            var f = function () {
                var job=i;
                GM_xmlhttpRequest ( {
                    method: unsafeWindow.WMEDBFDownloadHelper.jobs[job].params.method,
                    headers: unsafeWindow.WMEDBFDownloadHelper.jobs[job].params.headers,
                    data: unsafeWindow.WMEDBFDownloadHelper.jobs[job].params.data,
                    synchronous: false,
                    timeout: 3000,
                    url:    unsafeWindow.WMEDBFDownloadHelper.jobs[job].params.url,
                    onerror:    function(r) {
                        unsafeWindow.WMEDBFDownloadHelper.jobs[job].status = cloneInto( "error", unsafeWindow.WMEDBFDownloadHelper.jobs[job]);
                    },
                    ontimeout:    function(r) {
                        unsafeWindow.WMEDBFDownloadHelper.jobs[job].status = cloneInto( "error", unsafeWindow.WMEDBFDownloadHelper.jobs[job]);
                    },
                    onload:		function(r) {
                        unsafeWindow.WMEDBFDownloadHelper.jobs[job].status = cloneInto( "success", unsafeWindow.WMEDBFDownloadHelper.jobs[job]);
                        unsafeWindow.WMEDBFDownloadHelper.jobs[job].data = cloneInto( r.responseText, unsafeWindow.WMEDBFDownloadHelper.jobs[job]);
                    },
                    onprogress: function (r) {
                        unsafeWindow.WMEDBFDownloadHelper.jobs[job].progression = cloneInto( r.total==0?0:(r.loaded/r.total), unsafeWindow.WMEDBFDownloadHelper.jobs[job]);
                    }
                } );
            }();
        }
    }
    window.setTimeout(DBFlookFordownloadHelperJob, 2000);
}
window.setTimeout(DBFlookFordownloadHelperJob);

/*******************/

function run_DBF() {
    var DBF_Version = '0.26', CitiesOld=[], StatesOld=[], StatesPROld=[], Cty_Layer=[], Dpt_Layer=[], PR_Layer=[], Cam_Layer=[], Cam_DB={}, debug='';
    var icon_DrB ="iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAQaSURBVHja7JpbiFVVGIC/o3npJgkKvmnDGL1IoMlkjgrhYJaiQvawwWorjKUvpbA9UA+BCs7GF6OyRnNZykaMwod6iE7QeIO8YAiJoIwFQT3YBSyYhuz0MGvj4mdtz95nX07p+mFg1n19+7/sf619as1mk7tJxnGXiQN2wA7YATtgB+yAHXBlck/eCbxQZek+BegFFgE/ACeA7/KsHwV+tcAZ5CXgTWCmqD8OvAJcupNMejugLLAAi4GLwKY7AXgG8CnwRot+44F3gAPA5DI3VCvreOiFaj2wC5gumkYN095oGXoF2AF89L/xYS9Uu4GtlqZhYH0U+EO63yngLeAho89s4EPgkRSW0VkNe6Hq0qb5tKX5E+DlKPCvizHdwH5giWXMF8CW2wW0rBoeVyBsvw4+EnYEeDUK/OckrN7wVWCpNvO/RfOyogNaIRr2QvU2sNnSdBl4MQr8MynnWQx8AHRbmpUGH+mYhr1QzfFCNZQAewh4Ii2s3vxxYH5CwPK1tl/oiIa9UG3S/irlD2BLFPj7cj7MdZaAFsvOOKBVomEvVPsTYL8FFuaF1SCHtLaHLM2vA8cqSTy8UO0BNlia3gd6o8C/WFSAaRHQVgHvlm7SXqhGgQlG1e/A5ijwozIzpKSAFgV+rTQNe6HqEbDfAD1lwxoBrQc4KfbUW2am9aAlQF0TG9imU0pTBoE68FvCvLYxDaBPBKVJwDTR73qZPnxClBfp045NBoEB4DzQD5wDpraYPx7T0L67TbQvBR41YaPAv1wacBT4fwHme3UisOY2m68Dj2uILgPgV63RL/X/ckxdl+UDelaU91ZxPJSLLPNCdW+LMbE5rxVmjH4YWDQZHzZiV5lmybePlA4cBf5B4GejqhtYmGLosNDYANAngM8BTcOfG8J9Zhjlq+3ckrSbWr4nyqtTjJmaok/swx/r8lGjbUWLPZQKfDKjWc/TPnw+BXAdeF5rt0ub8wPAUy0CaHnAUeB/lcGs1xqaGky5xDz9F7/GFgCzjPYfRfCs5LTUyqxjfzyqNVU3TDVJ4jHxKyz275WiX9u5ep4rniSzblgi74BIOgbMCJwwZhAY9kI1wYjaSWtXcwHgheonETn7osBvFJxDLwBOG1W/mNlW1Vc87UTrrCKTjQN5JssLnDVaZ9VuDXimKHPODZwxWrcjc4DHRN3nndSwzazXFAi8XOzxNHCz08A2s76vJP/dm3fCIr48fC3KDwOveaH6Xs8/kbHvRU3Lw74/Yc7J+uw9V9R/9l8AvqlN7UkDZEcJ0fqCvk6i0yZdiKlVtUZRwIeBdfK6p0DN9udJJ4s2aRP6GLd+0jCLsavVUcY+j8jbxX+APxPmGgFu6BPR2SKfXs39fNgBO2AH7IAdsAN2wA7YATtgB5xG/h0AdcczDqMMEjAAAAAASUVORK5CYII=";
    function getId(node) { return document.getElementById(node); }
    function getElementsByClassName(classname, node) {
        node || (node = document.getElementsByTagName('body') [0]);
        for (var a = [], re = new RegExp('\\b' + classname + '\\b'), els = node.getElementsByTagName('*'), i = 0, j = els.length; i < j; i++) { re.test(els[i].className) && a.push(els[i]); }
        return a;
    }
    function isJsonString(str) {
        try { JSON.parse(str); }
        catch (e) { return false; }
        return true;
    }
    function DBF_bootstrap() {
        console.log('WME Draw Borders France : ' + DBF_Version + ' starting');
        DBFstep1();
    }
    function DBFstep1() {
        if(typeof(W.map) == 'undefined'){ window.setTimeout(DBFstep1, 500); return; }
        if(typeof(W.model) === 'undefined') { window.setTimeout(DBFstep1, 500); return; }
        if(typeof(OL) === 'undefined'){ window.setTimeout(DBFstep1, 500); return; }
        if(document.querySelector('.togglers') === null){ window.setTimeout(DBFstep1, 500); return; }
        createToggler();
        DBFstep2();
    }
    function DBFstep2(){
        if ('undefined' === typeof localStorage.speedCamList || !isJsonString(localStorage.speedCamList)) { localStorage.setItem('speedCamList', '[]'); }
        // WME Layers check
        checklayer("__WME_Draw_Border_Cty");
        checklayer("__WME_Draw_Border_Dpt");
        checklayer("__WME_Draw_Border_PR");
        checklayer("__WME_Draw_Border_Cam");
        W.map.events.register("moveend", null, show_border);
        load_radar(); // Just one time on launch
    }
    function createToggler(){
        // Layers switcher
        // test with script toggler----------------
        var oldTogglers = document.querySelectorAll('.togglers');
        oldTogglers.forEach(function(elt,idx){
            if(elt.id != "toolboxUl"){
                if (oldTogglers[idx].querySelector('.layer-switcher-group_scripts') === null)
                {
                    var newScriptsToggler = document.createElement('li');
                    newScriptsToggler.className = 'group';
                    newScriptsToggler.innerHTML = '<div class="controls-container main toggler">\<input class="layer-switcher-group_scripts toggle" id="layer-switcher-group_scripts" type="checkbox">\<label for="layer-switcher-group_scripts">\<span class="label-text">Scripts</span>\</label>\</div>\<ul class="children">\</ul>';
                    oldTogglers[idx].appendChild(newScriptsToggler);
                }

                var groupScripts = document.querySelector('.layer-switcher-group_scripts').parentNode.parentNode;
                var newScriptsChildren = getElementsByClassName("children", groupScripts)[0];

                var WMECS_toggleCity = document.createElement('li');
                WMECS_toggleCity.innerHTML = '<div class="controls-container toggler">\<input class="layer-switcher-item_WME_DB_City toggle" id="layer-switcher-item_WME_DB_City" type="checkbox">\<label for="layer-switcher-item_WME_DB_City">\<span class="label-text">Limites Ville</span>\</label>\</div>';
                newScriptsChildren.appendChild(WMECS_toggleCity);
                var togglerCity = getId('layer-switcher-item_WME_DB_City');

                var WMECS_toggleDpt = document.createElement('li');
                WMECS_toggleDpt.innerHTML = '<div class="controls-container toggler">\<input class="layer-switcher-item_WME_DB_Dpt toggle" id="layer-switcher-item_WME_DB_Dpt" type="checkbox">\<label for="layer-switcher-item_WME_DB_Dpt">\<span class="label-text">Limites Departements</span>\</label>\</div>';
                newScriptsChildren.appendChild(WMECS_toggleDpt);
                var togglerDpt = getId('layer-switcher-item_WME_DB_Dpt');

                var WMECS_togglePR = document.createElement('li');
                WMECS_togglePR.innerHTML = '<div class="controls-container toggler">\<input class="layer-switcher-item_WME_DB_PR toggle" id="layer-switcher-item_WME_DB_PR" type="checkbox">\<label for="layer-switcher-item_WME_DB_PR">\<span class="label-text">Points Routiers</span>\</label>\</div>';
                newScriptsChildren.appendChild(WMECS_togglePR);
                var togglerPR = getId('layer-switcher-item_WME_DB_PR');

                var WMECS_toggleCam = document.createElement('li');
                WMECS_toggleCam.innerHTML = '<div class="controls-container toggler">\<input class="layer-switcher-item_WME_DB_Cam toggle" id="layer-switcher-item_WME_DB_Cam" type="checkbox">\<label for="layer-switcher-item_WME_DB_Cam">\<span class="label-text">Emplacements Radars</span>\</label>\</div>';
                newScriptsChildren.appendChild(WMECS_toggleCam);
                var togglerCam = getId('layer-switcher-item_WME_DB_Cam');

                newScriptsChildren.appendChild(WMECS_toggleCity);
                newScriptsChildren.appendChild(WMECS_toggleDpt);
                newScriptsChildren.appendChild(WMECS_togglePR);
                newScriptsChildren.appendChild(WMECS_toggleCam);

                var groupToggler = getId('layer-switcher-group_scripts');
                groupToggler.checked = (typeof(localStorage.groupScriptsToggler) !=="undefined" ?
                                        JSON.parse(localStorage.groupScriptsToggler) : true);

                togglerCity.disabled = !groupToggler.checked;
                togglerCity.addEventListener('click', function(e) { Cty_Layer.setVisibility(e.target.checked); });

                togglerDpt.disabled = !groupToggler.checked;
                togglerDpt.addEventListener('click', function(e) { Dpt_Layer.setVisibility(e.target.checked); });

                togglerPR.disabled = !groupToggler.checked;
                togglerPR.addEventListener('click', function(e) { PR_Layer.setVisibility(e.target.checked); });

                togglerCam.disabled = !groupToggler.checked;
                togglerCam.addEventListener('click', function(e) { Cam_Layer.setVisibility(e.target.checked); });

                groupToggler.addEventListener('click', function(e) {
                    togglerCity.disabled = !e.target.checked;
                    togglerDpt.disabled = !e.target.checked;
                    togglerPR.disabled = !e.target.checked;
                    togglerCam.disabled = !e.target.checked;
                    Cty_Layer.setVisibility(togglerCity.checked ? e.target.checked : togglerCity.checked);
                    Dpt_Layer.setVisibility(togglerDpt.checked ? e.target.checked : togglerDpt.checked);
                    PR_Layer.setVisibility(togglerPR.checked ? e.target.checked : togglerPR.checked);
                    Cam_Layer.setVisibility(togglerCam.checked ? e.target.checked : togglerCam.checked);
                    localStorage.setItem('groupScriptsToggler', e.target.checked);
                });
            }
        });

    }
    function checklayer(layer) {
        var layers = W.map.getLayersBy("uniqueName",layer);
        if(layers.length === 0) {
            var DBF_style = new OL.Style({
                pointRadius: 2,
                fontWeight: "normal",
                label : "${labelText}",
                fontFamily: "Tahoma, Courier New",
                labelOutlineColor: "#FFFFFF",
                labelOutlineWidth: 2,
                fontColor: '#000000',
                fontSize: "10px"
            });

            if (layer=="__WME_Draw_Border_Cty") {
                Cty_Layer = new OL.Layer.Vector("Limites Villes", {
                    displayInLayerSwitcher: true,
                    uniqueName: layer,
                    styleMap: new OL.StyleMap(DBF_style)
                });
                Cty_Layer.setVisibility(false);
                W.map.addLayer(Cty_Layer);
                I18n.translations[I18n.locale].layers.name[layer] = "Villes";
            } else if (layer=="__WME_Draw_Border_Dpt") {
                Dpt_Layer = new OL.Layer.Vector("Limites Departements", {
                    displayInLayerSwitcher: true,
                    uniqueName: layer,
                    styleMap: new OL.StyleMap(DBF_style)
                });
                Dpt_Layer.setVisibility(false);
                W.map.addLayer(Dpt_Layer);
                I18n.translations[I18n.locale].layers.name[layer] = "Departements";
            } else if (layer=="__WME_Draw_Border_PR") {
                PR_Layer = new OL.Layer.Vector("Points Routiers", {
                    displayInLayerSwitcher: true,
                    uniqueName: layer,
                    styleMap: new OL.StyleMap(DBF_style)
                });
                PR_Layer.setVisibility(false);
                W.map.addLayer(PR_Layer);
                I18n.translations[I18n.locale].layers.name[layer] = "PR";
            } else {
                Cam_Layer = new OL.Layer.Vector("Radars", {
                    displayInLayerSwitcher: true,
                    uniqueName: layer,
                    styleMap: new OL.StyleMap(DBF_style)
                });
                Cam_Layer.setVisibility(false);
                W.map.addLayer(Cam_Layer);
                I18n.translations[I18n.locale].layers.name[layer] = "Radars";
            }
        }
    }
    function load_radar(){
        var listCam = localStorage.speedCamList;
        //Get Data
        try {
            var params={url: "https://radars.securite-routiere.gouv.fr/radars/all?_format=json",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        data: null,
                        method: 'GET'
                       };
            WMEDBFDownloadHelper.add(params, function(data) {
                if (data.status == 'success') {
                    if (_.isEqual(JSON.parse(listCam), JSON.parse(data.data)) !== true && data.data) {
                        console.log("WME Draw Borders France: Mise à jour de la liste des radars");
                        localStorage.setItem('speedCamList', data.data);
                    }
                }
            });
        }
        catch (e) { console.error("Error @ upload data:", e); }
    }
    function show_border(){
        var Cty_Layer = W.map.layers.find(function (l) { return l.uniqueName == "__WME_Draw_Border_Cty"; });
        var Dpt_Layer = W.map.layers.find(function (l) { return l.uniqueName == "__WME_Draw_Border_Dpt"; });
        var PR_Layer  = W.map.layers.find(function (l) { return l.uniqueName == "__WME_Draw_Border_PR"; });
        var Cam_Layer = W.map.layers.find(function (l) { return l.uniqueName == "__WME_Draw_Border_Cam"; });

        //Draw cities
        if (Cty_Layer.visibility === true) {
            if (W.model.cities.objects.length === 0) return;

            // collect list if unique cities from the segments
            var Cities=[],temp_city="";
            for (var cid in W.model.cities.objects) {
                var city = W.model.cities.getObjectById(cid).attributes.name;
                var state = W.model.states.getObjectById(W.model.cities.getObjectById(cid).attributes.stateID).name;
                if (city && state) {
                    city=city.toLowerCase(); state=state.toLowerCase();
                    city = city.replace(/[èéêë]/g,"e").replace(/ç/g, 'c').replace(/[àâ]/g, 'a').replace(/[îï]/g, 'i').replace(/[ôö]/g, 'o').replace(/œ/g, 'oe').replace(/\'/g, '_');
                    state=state.replace(/[èé]/g,"e").replace(/ô/g, 'o').replace(/\'/g, '_');
                    if (city.indexOf("(") != "-1") { city=city.substring(city.indexOf(" ("),city.substr(city.length - 1)); } // Commune de...
                    if (city) {
                        Cities.push({name: city, state: state});
                        if (debug) { console.log(city, state);  temp_city=temp_city+city+", "; }
                    }
                }
            }
            if (debug) { console.log("Villes demandées : ", temp_city); }
            //Get Data
            if (CitiesOld.toSource() != Cities.toSource()) {
                try {
                    if (debug) { console.log(JSON.stringify(Cities)); }
                    var params={url: "http://wmebookmarks.free.fr/communes.php",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                data: "data=" + JSON.stringify(Cities),
                                method: 'POST'
                               };
                    WMEDBFDownloadHelper.add(params, function(data) {
                        if (data.status == 'success') {
                            var r = JSON.parse(data.data),temp_city="",c=0;
                            if (r.length > 0) {
                                for (var i=0; r[i]; i++) {
                                    Cty_Borders_DrawBorder(r[i].name, r[i].coord); c++;
                                    if (debug) { temp_city=temp_city+r[i].name+", "; }
                                }
                            }
                            if (debug) { console.log("WME Draw Borders France: "+c+" villes reçues ", temp_city); }
                        }
                    });
                }
                catch (e) { console.error("Error @ upload data:", e); }
                CitiesOld = Cities;
            }
            else { if (debug) { console.log("WME Draw Borders France: Pas de nouvelles Villes détectées"); } }
        }

        //Dpt_Layer.visibility
        if (Dpt_Layer.visibility === true) {
            if (W.model.states.objects.length === 0) return;

            // collect list if unique states from the segments
            var States=[],temp_state="";
            for (var sid in W.model.states.objects) {
                var state = W.model.states.getObjectById(sid);
                if (state.countryID == "73"){
                    state=state.name.replace(/[èé]/g,"e").replace(/[ô]/g, 'o').replace(/\'/g, '_').replace(/ /g, '_');
                    States.push({name: state});
                    if (debug) { temp_state=temp_state+state+", "; }
                }
            }
            if (debug) { console.log(" départements demandées", temp_state); }
            //Get Data
            if (StatesOld.toSource() != States.toSource()) {
                try {
                    var params={url: "http://wmebookmarks.free.fr/departements.php",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                data: "data=" + JSON.stringify(States),
                                method: 'POST'
                               };
                    if (debug) { console.log(JSON.stringify(States)); }
                    WMEDBFDownloadHelper.add(params, function(data) {
                        if (data.status == 'success') {
                            var r = JSON.parse(data.data),temp_state="",c=0;
                            if (r.length > 0) {
                                for (var i=0; r[i]; i++) {
                                    Dpt_Borders_DrawBorder(r[i].name, r[i].coord); c++;
                                    if (debug) { temp_state=temp_state+r[i].name+", "; }
                                }
                            }
                            if (debug) { console.log("WME Draw Borders France: "+c+" départements reçus ", temp_state); }
                        }
                    });
                }
                catch (e) { console.error("Error @ upload data:", e); }

                StatesOld = States;
            }
            else { if (debug) { console.log("WME Draw Borders France: Pas de nouveaux Départements détectés"); } }
        }

        //PR_Layer.visibility
        if (PR_Layer.visibility === true) {
            if (W.model.states.objects.length === 0) return;

            // collect list if unique states from the segments
            var StatesPR=[],temp_statePR="";
            for (var sid in W.model.states.objects) {
                var statePR = W.model.states.getObjectById(sid);
                if (statePR.countryID == "73"){
                    statePR=statePR.id;
                    StatesPR.push({id: statePR});
                    if (debug) { temp_statePR=temp_statePR+statePR+", "; }
                }
            }
            if (debug) { console.log("ID départements demandées", temp_statePR); }
            //Get Data
            if (StatesPROld.toSource() != StatesPR.toSource()) {
                try {
                    var params={url: "http://wmebookmarks.free.fr/pr.php",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                data: "data=" + JSON.stringify(StatesPR),
                                method: 'POST'
                               };
                    if (debug) { console.log(JSON.stringify(StatesPR)); }
                    WMEDBFDownloadHelper.add(params, function(data) {
                        if (data.status == 'success') {
                            var r = JSON.parse(data.data),c=0;
                            if (r.length > 0) {
                                for (var i=0; r[i]; i++) {
                                    PR_Borders_DrawBorder(r[i].pk, r[i].lon, r[i].lat); c++;
                                }
                            }
                            if (debug) { console.log("WME Draw Borders France: "+c+" PR pour les départements"); }
                        }
                    });
                }
                catch (e) { console.error("Error @ upload data:", e); }

                StatesPROld = StatesPR;
            }
            else { if (debug) { console.log("WME Draw Borders France: Pas de nouveaux Départements détectés pour PR"); } }
        }

        //Cam_Layer.visibility
        if (Cam_Layer.visibility === true) {
            var listCam = localStorage.speedCamList;
            if (listCam) {
                var a = JSON.parse(listCam);
                for (var i=0; i < a.length; i++) { Cam_Borders_DrawBorder(a[i].typeLabel, a[i].lng, a[i].lat); }
            }
        }
    }
    function Cty_Borders_DrawBorder(Name, coordinateString) {
        var poly = new OL.Feature.Vector(Geometrize(Name, coordinateString), null, new Cty_Borders_Style(Name));
        var Cty_Layer = W.map.layers.find(function (l) { return l.uniqueName == "__WME_Draw_Border_Cty"; });
        Cty_Layer.addFeatures(poly);
    }
    function Dpt_Borders_DrawBorder(Name, coordinateString) {
        var poly = new OL.Feature.Vector(Geometrize(Name, coordinateString), null, new Dpt_Borders_Style(Name));
        var Dpt_Layer = W.map.layers.find(function (l) { return l.uniqueName == "__WME_Draw_Border_Dpt"; });
        Dpt_Layer.addFeatures(poly);
    }
    function PR_Borders_DrawBorder(Name, lon, lat) {
        var poly = new OL.Feature.Vector(Geometrize(Name, lon+";"+lat), null, new PR_Borders_Style(Name));
        var PR_Layer = W.map.layers.find(function (l) { return l.uniqueName == "__WME_Draw_Border_PR"; });
        PR_Layer.addFeatures(poly);
    }
    function Cam_Borders_DrawBorder(Name, lon, lat) {
        var poly = new OL.Feature.Vector(Geometrize(Name, lon+";"+lat), null, new Cam_Borders_Style(Name));
        var Cam_Layer = W.map.layers.find(function (l) { return l.uniqueName == "__WME_Draw_Border_Cam"; });
        Cam_Layer.addFeatures(poly);
    }
    function Cty_Borders_Style(Name){
        this.fill=false;
        this.stroke=true;
        this.strokeColor="#ce00ce";
        this.strokeWidth=2;
        this.strokeDashstyle="solid";
    }
    function Dpt_Borders_Style(Name){
        this.fill=false;
        this.stroke=true;
        this.strokeColor="#b20000";
        this.strokeWidth=5;
        this.strokeDashstyle="solid";
        this.label=Name.replace(/_/g, "'");
        this.fontSize=24;
        this.fontColor="#b20000";
        this.fontWeight="bold";
    }
    function PR_Borders_Style(Name){
        this.fill=false;
        this.stroke=true;
        this.strokeColor="#ff0000";
        this.strokeWidth=10;
        this.strokeDashstyle="solid";
        this.label="PR"+Name;
        this.labelYOffset=13;
        this.fontSize=12;
        this.fontColor="#ffff00";
        this.labelOutlineColor="#ff0000";
        this.labelOutlineWidth=3;
    }
    function Cam_Borders_Style(Name){
        this.fill=false;
        this.stroke=true;
        this.strokeColor="#ff0000";
        this.strokeWidth=10;
        this.strokeDashstyle="solid";
        this.label=Name;
        this.labelYOffset=13;
        this.fontSize=12;
        this.fontColor="#ffff00";
        this.labelOutlineColor="#ff0000";
        this.labelOutlineWidth=3;
    }
    function Geometrize(Name, coordinateString) {
        var tempVector = coordinateString.split(" ");
        var polyPoints = new Array(tempVector.length);
        for(var i=0; i<tempVector.length; i++) {
            var coordinateVector = tempVector[i].split(";");
            polyPoints[i]= new OL.Geometry.Point(coordinateVector[0],coordinateVector[1]).transform( new OL.Projection("EPSG:4326") , W.map.getProjectionObject());
        }
        var polygon = new OL.Geometry.Polygon(new OL.Geometry.LinearRing(polyPoints));
        return polygon;
    }
    DBF_bootstrap();
}
var DBFscript = document.createElement('script');
DBFscript.textContent = '' + run_DBF.toString() + ' \n' + 'run_DBF();';
DBFscript.setAttribute('type', 'application/javascript');
document.body.appendChild(DBFscript);