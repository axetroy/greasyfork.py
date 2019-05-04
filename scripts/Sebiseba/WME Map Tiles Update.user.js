// ==UserScript==
// @name         WME Map Tiles Update
// @version      1.38
// @description  Show the last server update and different times
// @namespace    Sebiseba
// @copyright    Sebiseba 2014-2016
// @include      https://www.waze.com/editor*
// @include      https://www.waze.com/*/editor*
// @include      https://beta.waze.com/*
// @exclude      https://www.waze.com/user/*editor/*
// @exclude      https://www.waze.com/*/user/*editor/*
// @require      https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @connect      storage.googleapis.com
// @connect      api.timezonedb.com
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// ==/UserScript==
/* jshint -W097 */
'use strict';
/***
Thanks
   Translations :
   Brazilian Portuguese by fsmallmann
   Hebrew by gad_m
***/
// **********************************
// **  DOWNLOAD HELPER BY DUMMYD2  **
// **********************************
/******** AUTO INJECTED PART ***************/
function MTUdownloadHelperInjected() {
    window.MTUDownloadHelper = {
        jobs: [],
        _waitForData: function (id)
        {
            if (this.jobs.length <= id) {
                this.jobs[id].callback({
                    url: null,
                    data: null,
                    callback: this.jobs[id].callback,
                    status: 'error',
                    error: 'Request not found'
                });
            }
            else
            {
                if (this.jobs[id].status == 'success' || this.jobs[id].status == 'error')
                    this.jobs[id].callback(this.jobs[id]);
                else
                {
                    if (this.jobs[id].status == 'downloading' && this.jobs[id].progressCallback) {
                        this.jobs[id].progressCallback(this.jobs[id]);
                    }
                    var _this = this;
                    window.setTimeout(function () {
                        _this._waitForData(id);
                    }, 500);
                }
            }
        },
        add: function (params, callback, progressCallback)
        {
            this.jobs.push({
                params: params,
                data: null,
                callback: callback,
                progressCallback: progressCallback,
                status: 'added',
                progression: 0,
                error: ''
            });
            var id = this.jobs.length - 1;
            var _this = this;
            window.setTimeout(function () {
                _this._waitForData(id);
            }, 500);
        }
    };
}
var MTUdownloadHelperInjectedScript = document.createElement('script');
MTUdownloadHelperInjectedScript.textContent = '' + MTUdownloadHelperInjected.toString() + ' \n' + 'MTUdownloadHelperInjected();';
MTUdownloadHelperInjectedScript.setAttribute('type', 'application/javascript');
document.body.appendChild(MTUdownloadHelperInjectedScript);
/******** SANDBOX PART ***************/
function MTUlookFordownloadHelperJob() {
    for (var i = 0; i < unsafeWindow.MTUDownloadHelper.jobs.length; i++) {
        if (unsafeWindow.MTUDownloadHelper.jobs[i].status == 'added') {
            unsafeWindow.MTUDownloadHelper.jobs[i].status = cloneInto('downloading', unsafeWindow.MTUDownloadHelper.jobs[i]);
            var f = function () {
                var job = i;
                GM_xmlhttpRequest({
                    method: unsafeWindow.MTUDownloadHelper.jobs[job].params.method,
                    headers: unsafeWindow.MTUDownloadHelper.jobs[job].params.headers,
                    data: unsafeWindow.MTUDownloadHelper.jobs[job].params.data,
                    synchronous: false,
                    timeout: 3000,
                    url: unsafeWindow.MTUDownloadHelper.jobs[job].params.url,
                    //job: i,
                    onerror: function (r) {
                        unsafeWindow.MTUDownloadHelper.jobs[job].status = cloneInto('error', unsafeWindow.MTUDownloadHelper.jobs[job]);
                    },
                    ontimeout: function (r) {
                        unsafeWindow.MTUDownloadHelper.jobs[job].status = cloneInto('error', unsafeWindow.MTUDownloadHelper.jobs[job]);
                    },
                    onload: function (r) {
                        unsafeWindow.MTUDownloadHelper.jobs[job].status = cloneInto('success', unsafeWindow.MTUDownloadHelper.jobs[job]);
                        unsafeWindow.MTUDownloadHelper.jobs[job].data = cloneInto(r.responseText, unsafeWindow.MTUDownloadHelper.jobs[job]);
                    },
                    onprogress: function (r) {
                        unsafeWindow.MTUDownloadHelper.jobs[job].progression = cloneInto(r.total == 0 ? 0 : (r.loaded / r.total), unsafeWindow.MTUDownloadHelper.jobs[job]);
                    }
                });
            }();
        }
    }
    window.setTimeout(MTUlookFordownloadHelperJob, 2000);
}
window.setTimeout(MTUlookFordownloadHelperJob);
/*******************/
function run_MTU() {
    var WME_MUpdate_Version = '1.38',
        lang, MTUhandle, MTUenv, MTULang, userLang, timermaphours, timerupd, tz, timestamp, debug = '';
    var icon_info = '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';
    var icon_close = 'iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABbSURBVHjajJBLFsAgCAOB5724OjmZXbUvxWjLys+MQryqpv2sYWaWmf4FApjBmx10rx84M70LACb/GnzJQgcXmAU1R6geVUsLzC8qIXbDKOGVhoqOz8cp417XAOaUPpt0thLzAAAAAElFTkSuQmCC';
    function getId(node) {
        return document.getElementById(node);
    }
    function getElementsByClassName(classname, node) {
        if (!node) node = document.getElementsByTagName('body') [0];
        var a = [];
        var re = new RegExp('\\b' + classname + '\\b');
        var els = node.getElementsByTagName('*');
        for (var i = 0, j = els.length; i < j; i++)
            if (re.test(els[i].className)) a.push(els[i]);
        return a;
    }
    function translate_server(lang) {
        var elt = '',
            trad = new Array('en', 'SERVER', 'en-GB', 'SERVER', 'es', 'SERVIDOR', 'es-419', 'SERVIDOR', 'fr', 'SERVEUR', 'it', 'SERVER', 'ru', 'сервер', 'ja', 'サーバー', 'he', 'שרת', 'de', 'SERVER', 'ro', 'SERVER', 'tr', 'SUNUCU', 'af', 'BEDIENER', 'cs', 'SERVER', 'ko', '서버', 'ms', 'SERVER', 'pl', 'SERWER', 'pt-BR', 'SERVIDOR', 'pt-PT', 'SERVIDOR', 'hu', 'SZERVER', 'nl', 'SERVER', 'sv', 'SERVER', 'no', 'SERVER', 'sk', 'SERVERA', 'da', 'SERVER', 'gl', 'GWEINYDDWR', 'lt', 'SERVERIS', 'zh', 'SERVER', 'bg', 'СЪРВЪРА', 'fi', 'SERVER', 'hr', 'SERVER'
                            );
        var i = - 1;
        for (elt in trad) {
            i++;
            if (trad[elt] == lang) {
                return trad[i + 1];
            }
        }
        return 'SERVER';
    }
    function IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    function pad(str) {
        str = str.toString();
        return str.length < 2 ? pad('0' + str, 2)  : str;
    }
    function checkTimestamp(strDate) {
        if (timestamp < strDate) {
            return '#f00';
        }
        else {
            return '#3a0';
        }
    }
    function getSelectedFeatures(){
        if(!W.selectionManager.getSelectedFeatures)
            return W.selectionManager.selectedItems;
        return W.selectionManager.getSelectedFeatures();
    }
    function MTUinit() {
        if (typeof (W.app) === 'undefined') {
            window.setTimeout(MTUinit, 500);
            return;
        }
        if (typeof (W.Config.api_base) === 'undefined') {
            setTimeout(MTUinit, 500);
            return;
        }
        if (typeof (I18n) === 'undefined') {
            setTimeout(MTUinit, 500);
            return;
        }
        MTUhandle = getId('overlay-buttons');
        if (!MTUhandle) {
            setTimeout(MTUinit, 1000);
            return;
        } // Detect Country Server (World/US/Israel)

        MTUenv = W.app.getAppRegionCode();
        if (debug) {
            console.info('WME Map Tiles Update - Serveur : ' + MTUenv);
        } //    Then running

        if (!localStorage.getItem('MTUlastupdate') || !IsJsonString(localStorage.getItem('MTUlastupdate'))) {
            localStorage.setItem('MTUlastupdate', '{"usa":"","row":"","il":"","version":""}');
        } // Translation

        MTULang = I18n.locale;
        if (debug) {
            console.info('WME Map Tiles Update - Langue: ' + MTULang);
        }
        html();
        W.selectionManager.events.register('selectionchanged', null, Check_MTU);
        //Check_MTU();
        setTimeout(Back_Info, 2000);
    }
    function html() {
        //CSS
        var cssElt = document.createElement('style');
        cssElt.type = 'text/css';
        var css = '#Info_div { width:25px;height:25px;margin:0 auto;margin-top:10px; }';
        if (MTULang == 'he') {
            var float = 'right';
            css += '#Info_content {direction:rtl;}';
        } else {
            var float = 'left';
        }
        css += '.Info_title { clear:both;float:' + float + ';width:160px;padding-right:15px;line-height:22px; text-align:' + float + '; }';
        css += '.Info_data { float:' + float + '; }';
        css += '.Info_line { clear:both;float:' + float + ';height:1px;min-width:330px;background-color:#59899e; }';
        css += '#Info_server { z-index:10;float:' + float + ';width:22px;height:22px;background:url(data:image/png;base64,' + icon_info + ') no-repeat ' + float + ' top; }';
        css += '#Info_text { z-index:11;float:' + float + '; }';
        css += '#Info_close { z-index:11;float:right;width:11px;height:11px;margin-right:3px;background:url(data:image/png;base64,' + icon_close + ') no-repeat right top; }';
        css += '#Info_content { z-index:10;position:fixed;top:80px;margin-left:30px;line-height:22px;padding:8px 5px 5px 8px;color:white;background-color:rgba(0,0,0,0.7);border-radius:6px;display:none; }';
        cssElt.innerHTML = css;
        document.body.appendChild(cssElt);
        //HTML
        var div = document.createElement('div');
        div.id = 'Info_div';
        var divicon = document.createElement('div');
        divicon.id = 'Info_server';
        divicon.onmouseover = (function () {
            Back_Info();
            Show_Info_content();
        });
        divicon.onmouseout = (function () {
            getId('Info_content').style.display = 'none';
            divicon.style.opacity = '0.5';
            clearTimeout(timermaphours);
        });
        divicon.onclick = (function () {
            if (MTUenv === 'il') {
                window.open('https://status-il.waze.com/');
            }
            else {
                window.open('https://status.waze.com/');
            }
        });
        div.appendChild(divicon);
        var divinfo = document.createElement('div');
        divinfo.id = 'Info_content';
        div.appendChild(divinfo);
        var divtext = document.createElement('div');
        divtext.id = 'Info_text';
        switch (MTULang) {
            case 'fr':
                userLang = new Array('Mis &agrave; jour jusqu\'au', 'Fait le', 'Dernier problème', 'Heure locale', 'Heure carte', 'Heure UTC', 'local');
                break;
            case 'pt-BR':
                userLang = new Array('Dados de', 'Efetuado em', 'Última problema', 'Hora local', 'Hora mapa', 'Hora UTC', 'local');
                break;
            case 'he':
                userLang = new Array('עדכון אחרון', 'בוצע', 'בעיה אחרונה', 'זמן מקומי', 'זמן מפה', 'זמן UTC', 'מקומי');
                break;
            default:
                userLang = new Array('Last update', 'Performed', 'Last problem', 'Home time', 'Map time', 'UTC time', 'home');
                break;
        }
        var content = '<div class=\'Info_title\'>' + translate_server(MTULang) + ' :</div><div class=\'Info_data\'><b>' + I18n.translations[MTULang].envs[MTUenv] + '</b></div>';
        content += '<div class=\'Info_title\'>Version WME</div><div class=\'Info_data\' style=\'color:#93C4D3;\' id=\'WMEVersion\'>'+ W.version +'</div><div class=\'Info_line\'></div>';
        content += '<div class=\'Info_title\'>' + userLang[0] + ' :</div><div class=\'Info_data\' style=\'color:#93C4D3;\' id=\'lastEditTime\'></div>';
        content += '<div class=\'Info_title\'>&nbsp;</div><div class=\'Info_data\' style=\'color:#59899e;\' id=\'lasttimeutc\'></div>';
        content += '<div class=\'Info_title\'>' + userLang[1] + ' :</div><div class=\'Info_data\' style=\'color:#93C4D3;\' id=\'mapRelease\'></div>';
        content += '<div class=\'Info_title\'>&nbsp;</div><div class=\'Info_data\' style=\'color:#59899e;\' id=\'whentimeutc\'></div>';
        content += '<div class=\'Info_line\'></div><div id=\'mtuerror\'>';
        content += '<div class=\'Info_title\'>' + userLang[2] + ' :</div><div class=\'Info_data\' style=\'color:#F23456;\' id=\'lastupderr\'></div>';
        content += '<div class=\'Info_line\'></div></div>';
        content += '<div class=\'Info_title\'>' + userLang[5] + ' :</div><div class=\'Info_data\' style=\'color:#93C4D3;font-weight:bold;\' id=\'utchours\'></div>';
        content += '<div class=\'Info_title\'>' + userLang[3] + ' :</div><div class=\'Info_data\' style=\'color:#93C4D3;font-weight:bold;\' id=\'localhours\'></div>';
        content += '<div class=\'Info_title\'>' + userLang[4] + ' :</div><div class=\'Info_data\' style=\'color:#93C4D3;font-weight:bold;\' id=\'maphours\'></div>';
        content += '<div id=\'tzname\' style=\'color:#59899e;font-weight:bold;font-size:10px;float:' + float + ';padding:0 5px;\'></div>';
        divtext.innerHTML = content;
        divinfo.appendChild(divtext);
        var divclose = document.createElement('div');
        divclose.id = 'Info_close';
        divclose.onclick = (function () {
            divinfo.style.backgroundColor = 'rgba(' + [0, 0, 0, 0.7].join(',') + ')';
            divinfo.style.display = 'none';
            divicon.style.opacity = '0.5';
        });
        divinfo.appendChild(divclose);
        MTUhandle.appendChild(div);
        if (debug) {
            console.log('WME Map Tiles Update - HTML OK');
        }
    }
    function Show_Info_content() {
        getId('Info_content').style.display = 'block';
        getId('Info_server').style.opacity = '1';
        if (getComputedStyle(MTUhandle).getPropertyValue('left') === '9px') {
            getId('Info_content').style.left = '350px';
            getId('Info_content').style.right = '';
        } else {
            getId('Info_content').style.right = '20px';
            getId('Info_content').style.left = '';
        }
    }
    function Back_Info() {
        try {
            var url='http://storage.googleapis.com/status_page/status.html';
            var params = {
                url: url,
                headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'text/plain' },
                data: null,
                method: 'GET'
            };
            MTUDownloadHelper.add(params, function (data) {
                if (debug) { console.log('MTU - Data from ', MTUenv, url, data); }
                if (data && data.status == 'success') {
                    // Get XML data
                    var parser = new DOMParser(), dates=[], probReason;
                    var xml = parser.parseFromString(data.data, 'text/html');
                    var entries = xml.getElementsByTagName("td");
                    switch(MTUenv) {
                        case "usa" : var id=5; break;
                        case "row" : var id=6; break;
                        case "il" : var id=7; break;
                        default: var id=6; break;
                    }
                    for (var i=0; entries[id].childNodes[i]; +i++) {
                        if (entries[id].childNodes[i].nodeName==="DIV") { probReason=entries[id].childNodes[i].innerHTML; }
                        else if (entries[id].childNodes[i].nodeName==="#text") { dates.push(entries[id].childNodes[i].textContent); }
                    }
                    if (debug) { console.log('MTU '+MTUenv+' / '+dates[1]+' / '+dates[3]+' / '+probReason); }

                    // Timestamp for localstorage
                    timestamp = Date.parse(dates[3]);

                    //Fill HTML
                    getId('lastEditTime').innerHTML='<b>'+convertToLocalDate(dates[3])+'</b>';
                    getId('mapRelease').innerHTML='<b>'+convertToLocalDate(dates[1])+'</b>';
                    getId('lasttimeutc').innerHTML='<b>'+convertToLocalTime(dates[3])+'</b>';
                    getId('whentimeutc').innerHTML='<b>'+convertToLocalTime(dates[1])+'</b>';

                    // Problem message
                    if (probReason) {
                        getId('mtuerror').style.display='block';
                        getId('lastupderr').innerHTML='<b>'+probReason+'</b>';
                    } else {
                        getId('mtuerror').style.display='none';
                    }

                    var checklast = JSON.parse(localStorage.getItem('MTUlastupdate'));
                    if (checklast[MTUenv] != dates[1] || checklast['version'] != W.version) {
                        getId('Info_content').style.backgroundColor = 'rgba(' + [25,50, 0, 0.7].join(',') + ')';
                        Show_Info_content();
                        checklast[MTUenv] = dates[1];
                        checklast['version'] = W.version;
                        localStorage.setItem('MTUlastupdate', JSON.stringify(checklast));
                        if (typeof (timerupd) != 'undefined') {
                            clearTimeout(timerupd);
                        }
                    } else {
                        timerupd = setTimeout(function () {
                            getId('Info_content').style.backgroundColor = 'rgba(' + [0, 0, 0, 0.7].join(',') + ')';
                            getId('Info_content').style.display = 'none';
                            getId('Info_server').style.opacity = '0.5';
                            clearTimeout(timermaphours);
                        }, 5000);
                    }
                }
                else {
                    console.log('Error: ', data);
                    getId('lastupderr').innerHTML = '<b>Error with datas</b>';
                }
            }, null);
        }
        catch (e) {
            console.error('Error @ upload data:', e);
            getId('lastupderr').innerHTML = '<font color=\'red\'>Error width datas</font>';
        }
        gettimezone();
        setTimeout(Back_Info, 1000 * 60 * 30);
    }
    function Check_MTU() {
        //try {
        var a = getElementsByClassName('additional-attributes list-unstyled side-panel-section') [0];
        if (typeof (a) === 'undefined') {
            return;
        }
        var so = getSelectedFeatures()[0]; // W.selectionManager.selectedItems[0];
        if (so.model.attributes.residential) { // Special residential
            var createdOn = so.model.attributes.createdOn,
                domCreated = I18n.translations[MTULang].edit.created + ' ',
                cd = new Date(createdOn).toString();
            var updatedOn = so.model.attributes.updatedOn,
                domUpdated = I18n.translations[MTULang].edit.updated + ' ',
                ud = new Date(updatedOn).toString();
            var content = '<li>' + domCreated.replace('%{time}', '<font color="' + checkTimestamp(createdOn) + '"><b>' + cd.substring(0, cd.indexOf(' GMT')) + '</b></font>').replace('%{user}', 'Wazer') + '</li>';
            if (typeof (updatedOn) !== 'undefined') {
                content += '<li>' + domUpdated.replace('%{time}', '<font color="' + checkTimestamp(updatedOn) + '"><b>' + ud.substring(0, ud.indexOf(' GMT')) + '</b></font>').replace('%{user}', 'Wazer') + '</li>';
            }
            a.children[0].innerHTML = content + a.children[0].innerHTML;
        }
        else if ((so.model.type === 'segment' || so.model.type === 'venue' || so.model.type === 'bigJunction') && typeof (so.model.attributes.createdBy) !== 'undefined') {
            var createdOn = so.model.attributes.createdOn,
                createdBy = W.model.users.getObjectById(so.model.attributes.createdBy).userName,
                createdByRank = W.model.users.getObjectById(so.model.attributes.createdBy).normalizedLevel,
                domCreated = I18n.translations[MTULang].edit.created + ' ',
                cd = new Date(createdOn).toString();
            if (typeof (so.model.attributes.updatedBy) !== 'undefined') {
                var updatedOn = so.model.attributes.updatedOn,
                    updatedBy = W.model.users.getObjectById(so.model.attributes.updatedBy).userName,
                    updatedByRank = W.model.users.getObjectById(so.model.attributes.updatedBy).normalizedLevel,
                    domUpdated = I18n.translations[MTULang].edit.updated + ' ',
                    ud = new Date(updatedOn).toString();
            }
            if (so.model.type == 'segment' || so.model.type == 'bigJunction') {
                var b = a.children[1].innerHTML,
                    c = a.children[2].innerHTML; // segment or big junction
            } else {
                if (typeof (updatedOn) === 'undefined') {
                    var b = null,
                        c = a.children[0].innerHTML; // venue without update
                } else {
                    var b = a.children[0].innerHTML,
                        c = a.children[1].innerHTML; // venue
                }
            }
            if (so.model.type == 'segment' || so.model.type == 'bigJunction') {
                a.children[2].innerHTML = domCreated.replace('%{time}', '<font color="' + checkTimestamp(createdOn) + '"><b>' + cd.substring(0, cd.indexOf(' GMT')) + '</b></font>').replace('%{user}', colorUser(createdBy, createdByRank));
                if (updatedOn) {
                    a.children[1].innerHTML = domUpdated.replace('%{time}', '<font color="' + checkTimestamp(updatedOn) + '"><b>' + ud.substring(0, ud.indexOf(' GMT')) + '</b></font>').replace('%{user}', colorUser(updatedBy, updatedByRank));
                }
            }
            else {
                if (typeof (updatedOn) === 'undefined') {
                    a.children[0].innerHTML = domCreated.replace('%{time}', '<font color="' + checkTimestamp(createdOn) + '"><b>' + cd.substring(0, cd.indexOf(' GMT')) + '</b></font>').replace('%{user}', colorUser(createdBy, createdByRank));
                } else {
                    a.children[1].innerHTML = domCreated.replace('%{time}', '<font color="' + checkTimestamp(createdOn) + '"><b>' + cd.substring(0, cd.indexOf(' GMT')) + '</b></font>').replace('%{user}', colorUser(createdBy, createdByRank));
                }
                if (updatedOn) {
                    a.children[0].innerHTML = domUpdated.replace('%{time}', '<font color="' + checkTimestamp(updatedOn) + '"><b>' + ud.substring(0, ud.indexOf(' GMT')) + '</b></font>').replace('%{user}', colorUser(updatedBy, updatedByRank));
                }
            }
        }
        else {
            return;
        }
        /*}
        catch (e) {
            console.error('MTU Error @ catch data:', e);
        }*/
    }
    function gettimezone() {
        var a = getElementsByClassName('WazeControlPermalink') [0].innerHTML;
        var b = a.substring(a.indexOf('https')).split('?');
        var c = b[1].split(/"/g);
        var d = c[0].split('&amp;');
        for (var i = 0; d[i]; i++) {
            if (d[i].substring(0, 3) == 'lon') {
                var lon = d[i].substring(4);
            }
            if (d[i].substring(0, 3) == 'lat') {
                var lat = d[i].substring(4);
            }
        }
        try {
            if (debug) {
                console.log('MTU - url : http://api.timezonedb.com/v2.1/get-time-zone?key=N2X1H5WP404Z&format=json&by=position&lng='+lon+'&lat='+lat);
            }
            var params = {
                url: 'http://api.timezonedb.com/v2.1/get-time-zone?key=N2X1H5WP404Z&format=json&by=position&lng='+lon+'&lat='+lat+'&time='+ Math.floor(new Date().getTime() / 1000),
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                    'Accept': 'text/plain'
                },
                data: null,
                method: 'GET'
            };
            MTUDownloadHelper.add(params, function (data) {
                if (data.status == 'success') {
                    var timezone = JSON.parse(data.data);
                    tz = timezone.formatted;
                    if (debug) { console.log('MTU - Loading Time Zone Success'); }
                    getId('tzname').innerHTML = ' '+timezone.countryName+' ('+timezone.zoneName+')';
                    maphours();
                }
            }, null);
        }
        catch (e) {
            console.error('MTU Error @ upload data:', e);
        }
    }
    function convertToLocalDate(date) {
        var a=date.split(' ');
        if (MTULang == 'fr') { return pad(a[1].replace(',',''))+' '+a[0]+' '+a[2]; } else { return a[0]+" "+a[1]+" "+a[2]; }
    }
    function convertToLocalTime(date) {
        var a=date.split(' '), b=a[3].split(':'), h=parseInt(b[0])-(new Date().getTimezoneOffset()/60);
        var tmpDate=new Date(a[2], new Date(Date.parse(a[0])).getMonth()+1, a[1].replace(',',''), h, b[1]);
        if (MTULang == 'he') {
            return pad(tmpDate.getHours())+":"+pad(tmpDate.getMinutes())+" local "+pad(tmpDate.getUTCHours())+":"+pad(tmpDate.getUTCMinutes())+" / UTC";
        } else {
            return pad(tmpDate.getUTCHours())+":"+pad(tmpDate.getUTCMinutes())+" UTC / "+pad(tmpDate.getHours())+":"+pad(tmpDate.getMinutes())+" local";
        }
    }
    function maphours() {
        //Local time
        var d = new Date();
        var h = pad(d.getHours());
        var m = pad(d.getMinutes());
        var s = pad(d.getSeconds());
        getId('localhours').innerHTML = h + ':' + m + ':' + s;
        //Map time
        var t=tz.split(' ');
        getId('maphours').innerHTML = t[1];
        // UTC Time
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var ud = new Date(utc);
        var uh = pad(ud.getHours());
        var um = pad(ud.getMinutes());
        var us = pad(ud.getSeconds());
        getId('utchours').innerHTML = uh + ':' + um + ':' + us;
        timermaphours = setTimeout(maphours, 1000);
    }
    function colorUser(editor, rank) {
        var user;
        if (/^(admin|adsteam-jiteanu|avseu|WazeFeed|WazeParking1|waze-maint-bot|Waze3rdparty)/.test(editor)) {
            user = '<font color="red">' + editor + '(' + rank + ')</font>';
        }
        else if (editor === 'Inactive User') {
            user = '<font color="grey">' + editor + '(' + rank + ')</font>';
        }
        else if (typeof (editor) === 'undefined') {
            user = '<font color="grey">Wazer(' + rank + ')</font>';
        }
        else {
            user = '<a target="_blank" href="https://www.waze.com/user/editor/' + editor + '">' + editor + '(' + rank + ')</a>';
        }
        return user;
    }
    console.log('WME Map Tiles Update - ' + WME_MUpdate_Version + ' starting');
    MTUinit();
}
var MTUscript = document.createElement('script');
MTUscript.textContent = '' + run_MTU.toString() + ' \n' + 'run_MTU();';
MTUscript.setAttribute('type', 'application/javascript');
document.body.appendChild(MTUscript);