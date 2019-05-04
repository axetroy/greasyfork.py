// ==UserScript==
// @name         WME Tiles Status Alert
// @name:he      תאריך בניית מפה
// @description  Show last successful tiles update. Alert if its more than 24h
// @description:he  מראה תאריך של בנית מפה מוצלחת אחרונה. מזהיר אם לא הייתה בניית מפה.
// @namespace    https://greasyfork.org/users/gad_m/wme_tiles_status_alert
// @version      0.3.06
// @author       gad_m
// @include      https://www.waze.com/editor/*
// @include      https://www.waze.com/*/editor/*
// @include      https://beta.waze.com/*
// @exclude      https://www.waze.com/user/*editor/*
// @exclude      https://www.waze.com/*/user/*editor/*
// @connect      status.waze.com
// @connect      status-il.waze.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==


/******************************************
*******************************************
Based on WME Map Tiles Update (by Sebiseba)
*******************************************
******************************************/

(function() {
    
    var locationCode;

	function bootstrap(tries) {
		console.debug('wme-status-alert: bootstrap()');
		tries = tries || 1;
		if (W && $) {
			init();
		} else if (tries < 20) {
			setTimeout(function () { bootstrap(tries++); }, 500);
		} else {
			console.log('wme-status-alert: failed to load');
		}
	}

    bootstrap();
    
    function init() {
        locationCode = W.location.code;
        var url = 'https://status.waze.com/feeds/posts/default';
        if (locationCode == 'il') {
            url = 'https://status-il.waze.com/feeds/posts/default';
        }
        console.debug('wme-status-alert: status feed URL: ' + url);
        GM_xmlhttpRequest({
            method: 'GET',
            synchronous: false,
            timeout: 5000,
            url: url,
            onerror: function (res) {
                console.error('wme-status-alert: error reading status feed URL: ' + url + ' responseText: ' + res.responseText + ' statusText: ' + res.statusText);
            },
            ontimeout: function (res) {
                console.error('wme-status-alert: timeout reading status feed URL: ' + url);
            },
            onload: function (res) {
                var domParser = new DOMParser();
                var lastSuccessfulUpdate;
                var responseXML = domParser.parseFromString(res.responseText,'text/xml');
                var entries = responseXML.getElementsByTagName("entry");
                for (var i=0; i<entries.length; i++) {
                    var title = entries[i].getElementsByTagName("title")[0].innerHTML;
                    var published = entries[i].getElementsByTagName("published")[0].innerHTML;
                    var titleSplit = title.split(" ");
                    if (!lastSuccessfulUpdate) {
                        if (locationCode=="usa" && titleSplit[0] == "NA" || locationCode=="row" && titleSplit[0] == "INTL" || locationCode=="il" && titleSplit[0] == "ISRAEL") {
                            if (title.substring(title.indexOf("successfully updated to:")) != -1) {
                                lastSuccessfulUpdate = title.substring(title.indexOf("successfully updated to:")+25);
                                if (lastSuccessfulUpdate.endsWith(" IST")) {
                                    lastSuccessfulUpdate = lastSuccessfulUpdate.substring(0, lastSuccessfulUpdate.length - " IST".length);
                                }
                                break;
                            }
                        }
                    } else {
                        break;
                    }
                }
                console.debug('wme-status-alert: last successful update: ' + lastSuccessfulUpdate);
                var lastSuccessfulAsDate = Date.parse(lastSuccessfulUpdate);
                // per IL request - always disply he format
                var localeBy = (W.location.code === 'il')?'he':W.location.locale;
                var localDateStr = lastSuccessfulAsDate.toLocaleString(localeBy);
                var gapInMs = Date.now() - lastSuccessfulAsDate.getTime();
                // add UI
                var topBar = jQuery('.topbar')[0];
                var newDiv = document.createElement('div');
                newDiv.id = "wme_status_alert";
                var additionalStyle = 'background-color: #3d3d3d; color:white; ';
                var additionalText = ''; //  default: no text (less than 24 hours) - OK
                if (gapInMs > 1000*60*60*24*3) { // 3 days
                    additionalStyle = 'background-color: #3d3d3d; color:red; font-weight: bold; ';
                    additionalText = ' (older than 3 days)';
                } else if (gapInMs > 1000*60*60*(24+8)) { // 1 day + 8 hours between build start and status updated
                    additionalStyle = 'background-color: #3d3d3d; color:yellow; font-weight: bold; ';
                    additionalText = ' (1-3 days old)';
                }
                newDiv.style = 'float:left; padding-left:10px; ' + additionalStyle;         
                newDiv.innerHTML = 'Tiles updated at ' + localDateStr + additionalText;
                topBar.appendChild(newDiv);
            } // end onload
        }); // end http request
    } // end init()
}.call(this));
