// ==UserScript==
// @name          WME GIS Buttons
// @author        @Philistine11
// @namespace     https://greasyfork.org/en/users/53803
// @description   Displays the locality of the current location and provides links to open GIS if available
// @include       https://*.waze.com/editor*
// @include       https://*.waze.com/*/editor*
// @version       1.5.2
// ==/UserScript==

async function gis_init() {
    let gisButtonsOn = JSON.parse(localStorage.getItem('gisButtonsOn'));
    let gisButtonsApiKey = localStorage.getItem('gisButtonsApiKey');
    const gisButtons = $('<div class="input-group input-group-sm" style="float:left; padding-left:2rem;"><span class="input-group-addon" style="display:table-cell; font-size:2rem; line-height:0; width:0;"><span id="gisStatus" class="fa fa-spinner fa-pulse" style="line-height:0;"></span></span><div class="input-group-btn" style="width:0;"><a id="gisLocality" class="btn btn-default disabled hidden" style="border:1px solid" target="_blank" href="#">Locality</a><a id="gisCounty" class="btn btn-default disabled hidden" style="border:1px solid" target="_blank" href="#">County</a><a id="gisState" class="btn btn-default disabled hidden" style="border:1px solid" target="_blank" href="#">State</a></span></div>');

    gisButtons.find('#gisStatus').click(() => {
        gisButtonsOn = !gisButtonsOn;
        localStorage.setItem('gisButtonsOn', gisButtonsOn);
        start();
    }).contextmenu(() => {
        do {
            gisButtonsApiKey = prompt("Enter your GIS Buttons API key:", gisButtonsApiKey || "").trim();
        } while (!gisButtonsApiKey || gisButtonsApiKey.length != 39);
        localStorage.setItem('gisButtonsApiKey', gisButtonsApiKey);
        start();
        return false;
    });

    let trigger;
    const setTrigger = () => {if (gisButtonsApiKey) trigger = setTimeout(update, 1000);}
    const clearTrigger = () => clearTimeout(trigger);

    const states = {};
    const rows = await $.getJSON('https://script.google.com/macros/s/AKfycbx2bytvT5Un0TWcaU7BpVkauqeE8zqt8Mek7Zq-OF-bznGYDyZw/exec?link=10dR8z16eKPHeI-ywLcHh2UNS3enQ7gt36Hhzm9nOJbA');
    for (let row in rows)
        states[rows[row][0]] = rows[row][1];

    const update = async () => {
        $('#gisStatus').removeClass().addClass('fa fa-spinner fa-pulse').css('color','').attr('title','');
        const center = W.map.getCenter().transform(new OL.Projection('EPSG:900913'), new OL.Projection('EPSG:4326'));
        const data = await $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${center.lat},${center.lon}&key=${gisButtonsApiKey}`);
        if (data.status !== 'OK') {
            $('#gisStatus').removeClass().addClass('fa fa-exclamation-circle').css('color','red').attr('title', "Check console for errors");
            return console.error("GIS Buttons", data);
        }

        let locs = data.results.find((result) => !result.types.includes("point_of_interest")).address_components || [];
        let locality = '', county = '', state = '';
        $('#gisLocality, #gisCounty, #gisState').addClass('hidden');
        for (let loc = 0; loc < locs.length; loc++) {
            if (locs[loc].types.indexOf('administrative_area_level_1') !== -1) {
                state = locs[loc].long_name;
                $('#gisState').removeClass('hidden').text(state);
            } else if (locs[loc].types.indexOf('administrative_area_level_2') !== -1) {
                county = locs[loc].long_name;
                $('#gisCounty').removeClass('hidden').text(county);
            } else if (locs[loc].types.indexOf('locality') !== -1) {
                locality = locs[loc].long_name;
                $('#gisLocality').removeClass('hidden').text(locality);
            }
        }

        $('#gisLocality, #gisCounty, #gisState').prop('href', '#').addClass('disabled');
        if (states.hasOwnProperty(state)) {
            if (typeof (states[state]) === 'string')
                states[state] = await $.getJSON(`https://script.google.com/macros/s/AKfycbx2bytvT5Un0TWcaU7BpVkauqeE8zqt8Mek7Zq-OF-bznGYDyZw/exec?link=${states[state]}`);
            for (let row in states[state])
                if (states[state][row][2] !== '')
                    if (states[state][row][1] === 'State') {
                        $('#gisState').prop('href', states[state][row][2].replace('<lat>',center.lat).replace('<lon>',center.lon).replace('<zoom>',W.map.getZoom()+12)).removeClass('disabled');
                    } else if (states[state][row][1] === 'County') {
                        if (county.indexOf(states[state][row][0]) != -1)
                            $('#gisCounty').prop('href', states[state][row][2].replace('<lat>',center.lat).replace('<lon>',center.lon).replace('<zoom>',W.map.getZoom()+12)).removeClass('disabled');
                    } else if (states[state][row][0] === locality)
                        $('#gisLocality').prop('href', states[state][row][2].replace('<lat>',center.lat).replace('<lon>',center.lon).replace('<zoom>',W.map.getZoom()+12)).removeClass('disabled');
        }
        $('#gisStatus').removeClass().addClass('fa fa-power-off').css('color','green').attr('title',"Click to turn off GIS Buttons");
    };

    function start(model, modeId) {
        if (modeId === 1) {
            clearTrigger();
            W.map.events.unregister('movestart', null, clearTrigger);
            W.map.events.unregister('moveend', null, setTrigger);
            return;
        }

        const location = $('div.topbar:not(.topbar-mte) > div.location-info-region');
        if (location.length === 0)
            return setTimeout(start, 500);
        location.after(gisButtons);

        if (gisButtonsOn) {
            if (gisButtonsApiKey) {
                W.map.events.register('movestart', null, clearTrigger);
                W.map.events.register('moveend', null, setTrigger);
                update();
            } else
                $('#gisStatus').removeClass().addClass('fa fa-key').css('color','red').attr('title',"Right-click to set GIS Buttons API Key");
        } else {
            clearTrigger();
            W.map.events.unregister('movestart', null, clearTrigger);
            W.map.events.unregister('moveend', null, setTrigger);
            $('#gisLocality, #gisCounty, #gisState').addClass('hidden');
            $('#gisStatus').removeClass().addClass('fa fa-power-off').css('color','red').attr('title',"Click to turn on GIS Buttons");
        }
    }

    W.app.modeController.model.bind('change:mode', start);
    start();
}

gis_init();