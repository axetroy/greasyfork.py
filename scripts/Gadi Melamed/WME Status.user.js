// ==UserScript==
// @name         WME Status
// @description  Show map build and points update information
// @namespace    https://greasyfork.org/users/gad_m/wme_status
// @version      0.1.07
// @author       gad_m
// @include      https://www.waze.com/editor
// @include      https://www.waze.com/editor*
// @include      https://www.waze.com/editor?*
// @include      https://www.waze.com/*/editor
// @include      https://www.waze.com/*/editor*
// @include      https://www.waze.com/*/editor?*
// @include      https://beta.waze.com/editor
// @include      https://beta.waze.com/editor*
// @include      https://beta.waze.com/editor?*
// @include      https://beta.waze.com/*/editor
// @include      https://beta.waze.com/*/editor*
// @include      https://beta.waze.com/*/editor?*
// @exclude      https://www.waze.com/user/*editor*
// @exclude      https://www.waze.com/*/user/*editor*
// @exclude      https://beta.waze.com/user/*editor*
// @exclude      https://beta.waze.com/*/user/*editor*
// @exclude      https://www.waze.com/user/*editor*
// @exclude      https://www.waze.com/*/user/*editor*
// @exclude      https://beta.waze.com/user/*editor*
// @exclude      https://beta.waze.com/*/user/*editor*
// @connect      storage.googleapis.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==


/******************************************
*******************************************
Based on WME Map Tiles Update (by Sebiseba)
*******************************************
******************************************/

(function() {

    var locationCode;
    var locationIndex=1;
    var dateOptions = {year: '2-digit', month: '2-digit',day: '2-digit', hour:'numeric', minute:'2-digit'};

	function bootstrap(tries) {
		console.debug('wme-status: bootstrap()');
		tries = tries || 1;
        var topBarTemp = jQuery('.topbar')[0];
		if (W && $ && topBarTemp) {
			init();
		} else if (tries < 20) {
			setTimeout(function () { bootstrap(tries++); }, 500);
		} else {
			console.log('wme-status: failed to load');
		}
	}

    bootstrap();

    function init() {
        locationCode = W.app.getAppRegionCode();
        console.info("wme-status: Location Code: " + locationCode);
        if (locationCode=="row") {
            locationIndex = 2;
        } else if (locationCode=="il") {
            locationIndex = 3;
        }
        var url = 'http://storage.googleapis.com/status_page/status.html';
        console.debug('wme-status: status URL: ' + url);
        GM_xmlhttpRequest({
            method: 'GET',
            synchronous: false,
            timeout: 5000,
            url: url,
            onerror: function (res) {
                console.error('wme-status: error reading status feed URL: ' + url + ' responseText: ' + res.responseText + ' statusText: ' + res.statusText);
            },
            ontimeout: function (res) {
                console.error('wme-status: timeout reading status feed URL: ' + url);
            },
            onload: function (res) {
                // per IL request - always disply he format
                var localeBy = (W.app.getAppRegionCode() === 'il')?'he':I18n.locale;
                console.debug("wme-status: localeBy: " + localeBy);
                var domParser = new DOMParser();
                var lastSuccessfulUpdate;
                var responseXML = domParser.parseFromString(res.responseText,'text/html');
                var entries = responseXML.getElementsByTagName("td");
                console.debug("wme-status: td tag entries.length: " + entries.length);
                var pointsAsDate = Date.parse(entries[locationIndex].innerHTML + " UTC");
                var pointsStr = entries[0].innerHTML + " " + pointsAsDate.toLocaleString(localeBy, dateOptions);
                console.debug("wme-status: Points string: " + pointsStr);
                var mapReleaseStr = entries[4+locationIndex].innerHTML;
                if (mapReleaseStr.indexOf('Map Release') > 0) {
                    mapReleaseStr = mapReleaseStr.substring(mapReleaseStr.indexOf('Map Release'));
                }
                var mapReleaseAsDate;
                var lastEditTimeAsDate;
                var splited = mapReleaseStr.split('<br>');
                for (var i=0; i<splited.length; i++) {
                    //console.info("wme-status: splited " + i + ": " +splited[i]);
                    if (splited[i].trim() === 'Map Release:') {
                        mapReleaseAsDate = Date.parse(splited[i+1] + " UTC");
                        console.debug("wme-status: Release: " + mapReleaseAsDate);
                    } else if (splited[i].trim() === 'Last Edit Time:') {
                        lastEditTimeAsDate = Date.parse(splited[i+1] + " UTC");
                        console.debug("wme-status: Last Edit: " + lastEditTimeAsDate);
                    }
                }
                var gapInMs = Date.now() - lastEditTimeAsDate.getTime();
                // add UI
                var topBar = jQuery('.topbar')[0];
                var lastEditDiv = document.createElement('div');
                lastEditDiv.id = "wme_last_edit";
                var additionalStyle = 'background-color: #3d3d3d; color:white; ';
                var additionalText = ''; //  default: no text (less than 24 hours) - OK
                if (gapInMs > 1000*60*60*24*3) { // 3 days
                    additionalStyle = 'background-color: #3d3d3d; color:red; font-weight: bold; ';
                    additionalText = ' (older than 3 days)';
                } else if (gapInMs > 1000*60*60*(24+8)) { // 1 day + 8 hours between build start and status updated
                    additionalStyle = 'background-color: #3d3d3d; color:yellow; font-weight: bold; ';
                    additionalText = ' (1-3 days old)';
                }
                lastEditDiv.style = 'float:left; padding-left:10px; ' + additionalStyle;
                lastEditDiv.innerHTML = "Last Edit: " + lastEditTimeAsDate.toLocaleString(localeBy, dateOptions) + additionalText;
                topBar.appendChild(lastEditDiv);

                var releaseDiv = document.createElement('div');
                releaseDiv.id = "wme_status_release";
                releaseDiv.style = 'float:left; padding-left:10px;background-color: #3d3d3d; color:white;';
                releaseDiv.innerHTML = "Map Release: " + mapReleaseAsDate.toLocaleString(localeBy, dateOptions) + " " + pointsStr;
                topBar.appendChild(releaseDiv);
            } // end onload
        }); // end http request
    } // end init()
}.call(this));
