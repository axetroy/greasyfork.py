// ==UserScript==
// @name         WME GIS Locator
// @namespace    https://greasyfork.org/en/users/173378-ramblinwreck
// @version      2019.04.09
// @description  opens associated county GIS map and takes you to the latitude and longitude you were at (in WME) on the GIS map just opened.
// @author       ramblinwreck_81
// @include      https://www.waze.com/en-US/editor*
// @exclude      https://www.waze.com/user/editor*
// @grant        none
// @require      https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js?version=229392

// This script requires WME GIS Buttons script installed

//https://www.waze.com/en-US/editor?env
// ==/UserScript==

(function() {
    'use strict';
    var settings = {};
    console.log('GIS-Locator: initiating anonymous function');
    function bootstrap(tries) {
        console.log('GIS-Locator: initiating bootstrap');
        tries = tries || 1;

        if (W && W.map &&
            W.model && W.loginManager.user &&
            $ ) {
            console.log('GIS-Locator: initializing WMEGL');
            WMEGLinit();
        } else if (tries < 1000) {
            setTimeout(function () {bootstrap(tries++);}, 200);
        }
    }


    function WMEGLinit() {
       // setTimeout(init,8000);
        init();
    }

    function init()
    {
        var $section = $("<div>");
        $section.html([
            '<div>',
            '<h2>GIS Locator</h2>',
            '<input type="checkbox" id="WMEGLEnabled" class="WMEGLSettingsCheckbox"><label for="WMEGLEnabled">Enable This Script</label>',
            '<hr>',
            '<input type="checkbox" id="WMEGLopen2ndWMEWindow" class="WME2window"><label for="WMEGL2ndWin">Open Second WME Window on Locate</label>',
            '<hr>',
            '<div>',
            '<h3>Last latitude and longitude Info</h3>',
            'Latitude: <span id="WMEGLlatitude"></span></br>',
            'Longitude: <span id="WMEGLlongitude"></span></br>',
            '</div>',
            '</div>'
        ].join(' '));

        new WazeWrap.Interface.Tab('GIS Locator', $section.html(), initializeSettings);
        addLocateButton();
        function addLocateButton () {

            var WMEGLy = document.createElement('div');
            WMEGLy.setAttribute('id', 'lat-long-info');
            WMEGLy.setAttribute('style', 'display:inline;');
            document.getElementById('sidepanel-gislocator').appendChild(WMEGLy);
            var WMEGLbb = document.createElement('button');
            WMEGLbb.setAttribute('type', 'button');
            WMEGLbb.setAttribute('value', 'Submit');
            WMEGLbb.setAttribute('id', 'WME-GIS-locator');
            WMEGLbb.setAttribute('title', 'initiate WME GIS Locator script');
            WMEGLbb.innerHTML = 'Locate';
            document.getElementById('lat-long-info').appendChild(WMEGLbb);
            document.getElementById("WME-GIS-locator").style.height="20px";
            document.getElementById("WME-GIS-locator").style.width="50px";
            document.getElementById('WME-GIS-locator').style.padding='1px';
            document.getElementById("WME-GIS-locator").addEventListener("click",localize, false);
            if(settings.Enabled) {
               document.getElementById('WME-GIS-locator').disabled = false;
            } else {
                document.getElementById('WME-GIS-locator').disabled = true;
            }
        }// end of addLocateButton function

        function localize()
        {
            if(document.getElementById('gisStatus').style.color === 'red')
            {
                var gisButtonsButton = document.getElementById('gisStatus');
                gisButtonsButton.click();
          //      alert("Please enable WME GIS Buttons.");
          //      return;
            }
            var WMEGLlatTimer;
            var WMEGLgetLat = false;
            document.getElementById('WME-GIS-locator').disabled = true;
            function get4326CenterPoint()
            {
                let projI = new OL.Projection("EPSG:900913");
                let projE = new OL.Projection("EPSG:4326");
                let center_lonlat = (new OL.LonLat(W.map.center.lon, W.map.center.lat)).transform(projI,projE);
                let lat = Math.round(center_lonlat.lat * 1000000) / 1000000;
                let lon = Math.round(center_lonlat.lon * 1000000) / 1000000;
                document.getElementById('WMEGLlatitude').innerHTML = lat;
                document.getElementById('WMEGLlongitude').innerHTML = lon;
                return new OL.LonLat(lon, lat);
            }

            let latlon = get4326CenterPoint();
            //document.getElementById('gisCounty').click();
            checkForGreen();

            function checkForGreen()
            {
                if(document.getElementById('gisStatus').style.color === 'green')
                {
                    clearTimeout(delay);
                    console.log('gone green');
                    finishIt();
                } else {
                    console.log('waiting for green...');
                    var delay = setTimeout(checkForGreen,250);
                }
            }
            function finishIt()
            {
                var WMEGLstr = document.getElementById('gisCounty').href;
                var string;
                var newURL;
                if (WMEGLstr.indexOf('qpublic') > -1) {
                    // matched on qpublic
                    // string = 'http://qpublic9.qpublic.net/qpmap4/map.php?county=ga_fulton&layers=parcels+roads+lakes&mapmode';
                    var equal = WMEGLstr.indexOf('=');
                    var ampersand = WMEGLstr.indexOf('&');
                    console.log(ampersand);
                    var oldCounty = WMEGLstr.substr(equal, ampersand - equal);
                    var underSc = oldCounty.indexOf('_');
                    var newCounty = oldCounty.substr(underSc + 1);
                    var firstLtr = newCounty.substr(0,1);
                    firstLtr = firstLtr.toUpperCase();
                    newCounty = firstLtr + newCounty.substr(1) + 'CountyGA';
                    newURL = 'https://qpublic.schneidercorp.com/Application.aspx?App=' + newCounty + '&Layer=Parcels&PageType=Map';
                    console.log('WMEGL new URL is ' + newURL);

                } else {

                    // no match on qpublic
                    newURL = WMEGLstr;
                    console.log('WMEGL new URL is ' + newURL);
                }
                window.open(newURL,'gisPage');


                // end of new code


                if(settings.open2ndWMEWindow) {
                    var WMEGLurl = 'https://www.waze.com/en-US/editor/?env=usa&lon=' + latlon.lon + '&lat=' + latlon.lat + '&zoom=4';
                    window.open(WMEGLurl,'wmeDup');
                }
                WMEGLcreateElements();
                function WMEGLthisTimeLat() {
                    clearInterval(WMEGLlatTimer);
                    erase();
                } // end of WMEGLthisTimeLat function
                function WMEGLcreateElements()
                {

                    var WMEGLz=document.createElement("button");
                    WMEGLz.setAttribute("type", "button");
                    WMEGLz.setAttribute("value", "Submit");
                    WMEGLz.setAttribute("id","grab-long-lat");
                    WMEGLz.setAttribute("title","Get Long");
                    WMEGLz.innerHTML = "Get Longitude";
                    var WMEGLaa=document.createElement('textArea');
                    WMEGLaa.setAttribute("id", "long-and-lat-txt");
                    WMEGLaa.textContent = "";
                    document.getElementById("lat-long-info").appendChild(WMEGLaa);
                    document.getElementById("lat-long-info").appendChild(WMEGLz);
                    document.getElementById("grab-long-lat").style.height="20px";
                    document.getElementById("grab-long-lat").style.width="100px";
                    var cancelIt = document.createElement('button');
                    cancelIt.setAttribute('type', 'button');
                    cancelIt.setAttribute('value', 'Cancel');
                    cancelIt.setAttribute('id', 'stop-lat-long');
                    cancelIt.setAttribute('title', 'Cancel Lat/Long');
                    document.getElementById('lat-long-info').appendChild(cancelIt);
                    document.getElementById('stop-lat-long').style.height = '20px';
                    document.getElementById('stop-lat-long').style.width = '100px';
                    cancelIt.innerHTML = "Cancel";
                    document.getElementById('stop-lat-long').addEventListener('click', erase,false);

                } // end of WMGGLcreateElements function

                function erase()
                {
                    document.getElementById('WME-GIS-locator').disabled = false;
                    document.getElementById("grab-long-lat").removeEventListener('click',coordinates, false);
                    var removeElement = document.getElementById("grab-long-lat");
                    removeElement.parentNode.removeChild(removeElement);
                    removeElement = document.getElementById('long-and-lat-txt');
                    removeElement.parentNode.removeChild(removeElement);
                    removeElement = document.getElementById('stop-lat-long');
                    removeElement.parentNode.removeChild(removeElement);
                }


                function coordinates()
                {

                    if(WMEGLgetLat !==true) {
                        document.getElementById("long-and-lat-txt").textContent = latlon.lon;
                        document.getElementById("long-and-lat-txt").select();
                        document.execCommand("copy");
                        var WMEGLa = document.getElementById("grab-long-lat");
                        WMEGLa.innerHTML = "Get Latitude";
                        WMEGLgetLat = true;
                    } else {
                        document.getElementById("long-and-lat-txt").textContent = latlon.lat;
                        document.getElementById("long-and-lat-txt").select();
                        document.execCommand("copy");
                        WMEGLlatTimer = setInterval(function(){WMEGLthisTimeLat();},4000);
                    }
                }//end of coordinates function
                document.getElementById("grab-long-lat").addEventListener("click",coordinates, false);
            }

        }// end of localize function

    } // end of init function
    function initializeSettings()
    {
        loadSettings();
        setChecked('WMEGLEnabled', settings.Enabled);
        setChecked('WMEGLopen2ndWMEWindow', settings.open2ndWMEWindow);

        $('#WMEGLlatitude').text('');
        $('#WMEGLlongitude').text('');
        $('.WMEGLSettingsCheckbox').change(function() {
            var settingName = $(this)[0].id.substr(5);
            settings[settingName] = this.checked;
            saveSettings();
            if(settings.Enabled) {
                document.getElementById('WME-GIS-locator').disabled = false;
            } else {
                document.getElementById('WME-GIS-locator').disabled = true;
            }
            console.log(settingName + ' checkbox change saved');
        });
        $('#WMEGLopen2ndWMEWindow').change(function() {
            settings.open2ndWMEWindow = this.checked;
            saveSettings();
        });
    }

    function setChecked(checkboxId, checked)
    {
        $('#' + checkboxId).prop('checked', checked);
    }

    function saveSettings()
    {
        if (localStorage) {
            var localsettings = {
                Enabled: settings.Enabled,
                open2ndWMEWindow: settings.open2ndWMEWindow,

            };

            localStorage.setItem("WMEGL_Settings", JSON.stringify(localsettings));
        }
        if(settings.Enabled) {
            document.getElementById('WME-GIS-locator').disabled = false;
        } else {
            document.getElementById('WME-GIS-locator').disabled = true;
        }
    }

    function loadSettings()
    {
        var loadedSettings = $.parseJSON(localStorage.getItem("WMEGL_Settings"));
        var defaultSettings = {
            Enabled: false,
            open2ndWMEWindow: false,
        };
        settings = loadedSettings ? loadedSettings : defaultSettings;
        for (var prop in defaultSettings) {
            if (!settings.hasOwnProperty(prop)) {
                settings[prop] = defaultSettings[prop];
            }
        }

    }
    bootstrap();
})();
