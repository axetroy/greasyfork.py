// ==UserScript==
// @name           hwm_battlelinks
// @author         Demin
// @namespace      Demin
// @description    Быстрые ссылки на итоги боя, начало, конец, чат боя
// @icon           http://i.imgur.com/LZJFLgt.png
// @version        3.11
// @encoding 	   utf-8
// @include        /^https{0,1}:\/\/((www|qrator)\.(heroeswm|lordswm)\.(ru|com)|178\.248\.235\.15)\/.+/
// @exclude        /^https{0,1}:\/\/((www|qrator)\.(heroeswm|lordswm)\.(ru|com)|178\.248\.235\.15)\/(login|war|cgame|frames|chat|chatonline|ch_box|chat_line|ticker|chatpost|rightcol|brd|frames|auction|object-info)\.php.*/
// @grant          GM_deleteValue
// @grant          GM_getValue
// @grant          GM_listValues
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// ==/UserScript==

// (c) 2010-2015, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )

(function() {
    setTimeout(function() {

        var version = '3.10';


        var blank = ' target="_blank"';
        //var blank = '';


        //****************************************************
        /** Библиотека юникода
*
* Реализует функции работы с юникодом.
* @file lib_unicode.js
* @version 1.1.0
* @author DrunkenStranger
* @link http://userscripts.org/users/362572
* @license GPL
*/
        function uchar(s) {
            switch (s[0]) {
                case "А": return "\u0410";
                case "Б": return "\u0411";
                case "В": return "\u0412";
                case "Г": return "\u0413";
                case "Д": return "\u0414";
                case "Е": return "\u0415";
                case "Ж": return "\u0416";
                case "З": return "\u0417";
                case "И": return "\u0418";
                case "Й": return "\u0419";
                case "К": return "\u041a";
                case "Л": return "\u041b";
                case "М": return "\u041c";
                case "Н": return "\u041d";
                case "О": return "\u041e";
                case "П": return "\u041f";
                case "Р": return "\u0420";
                case "С": return "\u0421";
                case "Т": return "\u0422";
                case "У": return "\u0423";
                case "Ф": return "\u0424";
                case "Х": return "\u0425";
                case "Ц": return "\u0426";
                case "Ч": return "\u0427";
                case "Ш": return "\u0428";
                case "Щ": return "\u0429";
                case "Ъ": return "\u042a";
                case "Ы": return "\u042b";
                case "Ь": return "\u042c";
                case "Э": return "\u042d";
                case "Ю": return "\u042e";
                case "Я": return "\u042f";
                case "а": return "\u0430";
                case "б": return "\u0431";
                case "в": return "\u0432";
                case "г": return "\u0433";
                case "д": return "\u0434";
                case "е": return "\u0435";
                case "ж": return "\u0436";
                case "з": return "\u0437";
                case "и": return "\u0438";
                case "й": return "\u0439";
                case "к": return "\u043a";
                case "л": return "\u043b";
                case "м": return "\u043c";
                case "н": return "\u043d";
                case "о": return "\u043e";
                case "п": return "\u043f";
                case "р": return "\u0440";
                case "с": return "\u0441";
                case "т": return "\u0442";
                case "у": return "\u0443";
                case "ф": return "\u0444";
                case "х": return "\u0445";
                case "ц": return "\u0446";
                case "ч": return "\u0447";
                case "ш": return "\u0448";
                case "щ": return "\u0449";
                case "ъ": return "\u044a";
                case "ы": return "\u044b";
                case "ь": return "\u044c";
                case "э": return "\u044d";
                case "ю": return "\u044e";
                case "я": return "\u044f";
                case "Ё": return "\u0401";
                case "ё": return "\u0451";
                default: return s[0];
            }
        }

        function ustring(s) {
            s = String(s);
            var result = "";
            for (var i = 0; i < s.length; i++)
                result += uchar(s[i]);
            return result;
        }
        //****************************************************
        if (typeof GM_deleteValue != 'function') {
            this.GM_getValue=function (key,def) {return localStorage[key] || def;};
            this.GM_setValue=function (key,value) {return localStorage[key]=value;};
            this.GM_deleteValue=function (key) {return delete localStorage[key];};

            this.GM_addStyle=function (key) {
                var style = document.createElement('style');
                style.textContent = key;
                document.querySelector("head").appendChild(style);
            }

            this.GM_xmlhttpRequest=function (details) {
                function setupEvent(xhr, url, eventName, callback) {
                    xhr[eventName] = function() {
                        var isComplete = xhr.readyState == 4;
                        var responseState = {
                            responseText: xhr.responseText,
                            readyState: xhr.readyState,
                            responseHeaders: isComplete ? xhr.getAllResponseHeaders() : "",
                            status: isComplete ? xhr.status : 0,
                            statusText: isComplete ? xhr.statusText : "",
                            finalUrl: isComplete ? url : ""
                        };
                        callback(responseState);
                    };
                }
                var xhr = new XMLHttpRequest();
                var eventNames = ["onload", "onerror", "onreadystatechange"];
                for (var i = 0; i < eventNames.length; i++) {
                    var eventName = eventNames[i];
                    if (eventName in details) {
                        setupEvent(xhr, details.url, eventName, details[eventName]);
                    }
                }
                xhr.open(details.method, details.url);
                if (details.overrideMimeType) {
                    xhr.overrideMimeType(details.overrideMimeType);
                }
                if (details.headers) {
                    for (var header in details.headers) {
                        xhr.setRequestHeader(header, details.headers[header]);
                    }
                }
                xhr.send(details.data ? details.data : null);
            }
        }

        var url_cur = location.href;
        var url = location.protocol +'//'+location.hostname+'/';


        var a = document.querySelectorAll("a[href*='warid=']");
        var warid = /warid=(\d+)/,
            show_for_all = /show_for_all=([a-z|\d]+)/;
        var ai, warid_ai, show_for_all_ai, bt, mode;

        for ( var i=a.length; i--; ) {
            ai = a[i];
            if ( warid_ai = warid.exec(ai) ) {
                warid_ai = warid_ai[1];

                if (show_for_all_ai = show_for_all.exec(ai)){
                    show_for_all_ai = "&show_for_all=" + show_for_all.exec(ai)[1];
                } else {
                    show_for_all_ai = "";
                }

                if (mode = /(&html5=1)/.exec(ai)){
                    mode = mode[1];
                } else if (mode = /(&flash=1)/.exec(ai)){
                    mode = mode[1];
                } else {
                    mode = "";
                }

                bt = document.createElement('span');

                bt.innerHTML = '&nbsp;[<a href="'+url+'war.php?lt=-1&warid='+warid_ai + show_for_all_ai + mode +'"'+blank+'>#</a>'+
                    '&nbsp;<a href="'+url+'battlechat.php?warid='+warid_ai + show_for_all_ai +'"'+blank+'>chat</a>'+
                    '&nbsp;<a href="'+url+'war.php?warid='+warid_ai + show_for_all_ai + mode +'"'+blank+'>$</a>'+
                    '&nbsp;<a href="'+url+'battle.php?lastturn=-3&warid='+warid_ai + show_for_all_ai + '"'+blank+'>E</a>]';

                ai.parentNode.insertBefore(bt, ai.nextSibling);
                addEvent(ai, "click", show_result);
            }
        }

        function show_result(event)
        {
            event = event || window.event;
            event.preventDefault ? event.preventDefault() : (event.returnValue=false);
            var ai = event.target || event.srcElement;

            while ( !warid.exec(ai.href) ) { ai = ai.parentNode; }
            // for home page (once) && pl_info page (in battle) (twice)
            warid_ai = warid.exec(ai.href)[1];
            if (show_for_all_ai = show_for_all.exec(ai.href)){
                show_for_all_ai = "&show_for_all=" + show_for_all.exec(ai)[1];
            } else {
                show_for_all_ai = "";
            }

            GM_addStyle('\
#war_result table, #war_result td {background-image: none; text-align: left; border: 0px; margin: 0px; padding: 0px; line-height: 16px; border-collapse: separate;}\
#war_result td, #war_result a, #war_result b {FONT-SIZE: 9pt; COLOR: #592C08; FONT-FAMILY: verdana, geneva, arial cyr;}\
#war_result font {FONT-SIZE: 9pt; FONT-FAMILY: verdana, geneva, arial cyr}\
');

            var newdiv = $('war_result');
            if ( !newdiv ) {
                newdiv = document.createElement('div');
                newdiv.setAttribute('id', 'war_result');
                with ( newdiv.style ) {
                    position = 'absolute';
                    borderStyle = 'solid';
                    borderColor = '#000000';
                    borderWidth = '2px';
                    padding = '0px';
                    zIndex = '3';
                }
            }

            newdiv.style.left = event.pageX + 25;
            newdiv.style.top = event.pageY + 5;

            newdiv.innerHTML = '<table cellspacing=4 cellpadding=0 bgcolor="#f5f3ea"><tr>'+
                '<td align="left">warid: '+warid_ai+

                '&nbsp;[<a href="'+url+'war.php?lt=-1&warid='+warid_ai+'"'+blank+'>#</a>'+
                '&nbsp;<a href="'+url+'battlechat.php?warid='+warid_ai+'"'+blank+'>chat</a>'+
                '&nbsp;<a href="'+url+'war.php?warid='+warid_ai+'"'+blank+'>$</a>'+
                '&nbsp;<a href="'+url+'battle.php?lastturn=-3&warid='+warid_ai+'"'+blank+'>E</a>]'+

                '</td><td width=100></td>'+
                '<td align="right" id="close_div_result" title="Close" style="text-align: right;">[x]</td></tr>'+
                '<tr><td align="left" id="war_result_cont" colspan="3"><br>'+loaders()+'</td></tr>'+
                '</table>';

            ai.parentNode.insertBefore(newdiv, ai.nextSibling);
            addEvent($("close_div_result"), "click", div_close_result);

            /*
if ( url != 'http://'+location.hostname+'/' ) {
	var div = $('war_result_cont');
	div.innerHTML = '<br>Не выполнимо на данном домене';
	return;
}
*/

            GM_xmlhttpRequest
            ({
                method: "GET",
                url: url + 'battle.php?lastturn=-2&warid=' + warid_ai + show_for_all_ai,
                onload: function(obj)
                {
                    handleHttpResponseWid(obj);
                }
            });

            /*
var objXMLHttpReqWid = new XMLHttpRequest();
objXMLHttpReqWid.open('GET', url + 'battle.php?lastturn=-2&warid=' + warid_ai, true);
//objXMLHttpReqWid.overrideMimeType("text/plain; charset=windows-1251");
objXMLHttpReqWid.onreadystatechange = function() { handleHttpResponseWid(objXMLHttpReqWid); }
objXMLHttpReqWid.send(null);
*/

        }

        function div_close_result() {
            var temp_rez = $('war_result');
            temp_rez.parentNode.removeChild(temp_rez);
        }

        function handleHttpResponseWid(obj) {
            if ( obj.readyState != 4 ) return;
            var div = $('war_result_cont');
            if ( obj.status != 200 ) {
                div.innerHTML = "<br>Http error "+String(obj.status);
                return;
            }
            var arr = obj.responseText.split(";/", 2);

            var lwm = 0;
            if ( url.match('lordswm') ) {
                var regexp_exp = /(\d+) exp/;
                var regexp_skill = /(\d*\.?\d+) skill/;
                var err = "Parse error.";

                lwm = 1;
                var pos = arr[0].indexOf('#f_en');
                if ( pos==-1 ) { lwm = 0; pos = arr[0].indexOf('f<font size="18"><b>'); } // esli staryi boj na lwm.com do ob'edinenija
            } else {
                var regexp_exp = /(\d+) опыт/;
                var regexp_skill = /(\d*\.?\d+) умени/;
                var err = "Результаты боя не найдены.";

                var pos = arr[0].indexOf('f<font size="18"><b>');
            }

            if ( pos==-1 ) {
                div.innerHTML = "<br>" + err;
                return;
            }

            if ( lwm==1 ) {
                var tmp = arr[0].substr(pos+5);
            } else {
                var tmp = arr[0].substr(pos+1);
            }

            tmp = tmp.substr(0, tmp.indexOf('|#')).replace(/ size="18"/g, '').replace(/font color="/g, 'font style="color: ');
            arr = tmp.split("<br");
            var expir, umka, ExpUm, rez;
            for (var i in arr) {
                if (arr[i].indexOf(ustring("опыта")) != -1) {
                    expir = arr[i].substring(arr[i].indexOf(ustring("получает "))+9,arr[i].indexOf(ustring(" опыта")));
                    umka = arr[i].substring(arr[i].indexOf(ustring(" и "))+3,arr[i].indexOf(ustring("умени")));
                    if (umka != 0) {ExpUm = Math.ceil(expir / umka);} else {ExpUm = "-";}
                    arr[i] = arr[i].replace(ustring("умение"),ustring("умение (")+ExpUm+')');
                    arr[i] = arr[i].replace(ustring("умения"),ustring("умения (")+ExpUm+')');
                    arr[i] = arr[i].replace(ustring("умений"),ustring("умений (")+ExpUm+')');
                }
            }

            div.innerHTML = '<br>' + arr.join("<br");
        }

        function loaders() {
            return '<img border="0" align="absmiddle" height="11" src="data:image/gif;base64,'+
                'R0lGODlhEAAQAMQAAP///+7u7t3d3bu7u6qqqpmZmYiIiHd3d2ZmZlVVVURERDMzMyIiIhEREQAR'+
                'AAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05F'+
                'VFNDQVBFMi4wAwEAAAAh+QQFBwAQACwAAAAAEAAQAAAFdyAkQgGJJOWoQgIjBM8jkKsoPEzgyMGs'+
                'CjPDw7ADpkQBxRDmSCRetpRA6Rj4kFBkgLC4IlUGhbNQIwXOYYWCXDufzYPDMaoKGBoKb886OjAK'+
                'dgZAAgQkfCwzAgsDBAUCgl8jAQkHEAVkAoA1AgczlyIDczUDA2UhACH5BAUHABAALAAAAAAPABAA'+
                'AAVjICSO0IGIATkqIiMKDaGKC8Q49jPMYsE0hQdrlABCGgvT45FKiRKQhWA0mPKGPAgBcTjsspBC'+
                'AoH4gl+FmXNEUEBVAYHToJAVZK/XWoQQDAgBZioHaX8igigFKYYQVlkCjiMhACH5BAUHABAALAAA'+
                'AAAQAA8AAAVgICSOUGGQqIiIChMESyo6CdQGdRqUENESI8FAdFgAFwqDISYwPB4CVSMnEhSej+Fo'+
                'gNhtHyfRQFmIol5owmEta/fcKITB6y4choMBmk7yGgSAEAJ8JAVDgQFmKUCCZnwhACH5BAUHABAA'+
                'LAAAAAAQABAAAAViICSOYkGe4hFAiSImAwotB+si6Co2QxvjAYHIgBAqDoWCK2Bq6A40iA4yYMgg'+
                'NZKwGFgVCAQZotFwwJIF4QnxaC9IsZNgLtAJDKbraJCGzPVSIgEDXVNXA0JdgH6ChoCKKCEAIfkE'+
                'BQcAEAAsAAAAABAADgAABUkgJI7QcZComIjPw6bs2kINLB5uW9Bo0gyQx8LkKgVHiccKVdyRlqjF'+
                'SAApOKOtR810StVeU9RAmLqOxi0qRG3LptikAVQEh4UAACH5BAUHABAALAAAAAAQABAAAAVxICSO'+
                '0DCQKBQQonGIh5AGB2sYkMHIqYAIN0EDRxoQZIaC6bAoMRSiwMAwCIwCggRkwRMJWKSAomBVCc5l'+
                'UiGRUBjO6FSBwWggwijBooDCdiFfIlBRAlYBZQ0PWRANaSkED1oQYHgjDA8nM3kPfCmejiEAIfkE'+
                'BQcAEAAsAAAAABAAEAAABWAgJI6QIJCoOIhFwabsSbiFAotGMEMKgZoB3cBUQIgURpFgmEI0EqjA'+
                'CYXwiYJBGAGBgGIDWsVicbiNEgSsGbKCIMCwA4IBCRgXt8bDACkvYQF6U1OADg8mDlaACQtwJCEA'+
                'IfkEBQcAEAAsAAABABAADwAABV4gJEKCOAwiMa4Q2qIDwq4wiriBmItCCREHUsIwCgh2q8MiyEKO'+
                'DK7ZbHCoqqSjWGKI1d2kRp+RAWGyHg+DQUEmKliGx4HBKECIMwG61AgssAQPKA19EAxRKz4QCVIh'+
                'ACH5BAUHABAALAAAAAAQABAAAAVjICSOUBCQqHhCgiAOKyqcLVvEZOC2geGiK5NpQBAZCilgAYFM'+
                'ogo/J0lgqEpHgoO2+GIMUL6p4vFojhQNg8rxWLgYBQJCASkwEKLC17hYFJtRIwwBfRAJDk4Obwsi'+
                'dEkrWkkhACH5BAUHABAALAAAAQAQAA8AAAVcICSOUGAGAqmKpjis6vmuqSrUxQyPhDEEtpUOgmgY'+
                'ETCCcrB4OBWwQsGHEhQatVFhB/mNAojFVsQgBhgKpSHRTRxEhGwhoRg0CCXYAkKHHPZCZRAKUERZ'+
                'MAYGMCEAIfkEBQcAEAAsAAABABAADwAABV0gJI4kFJToGAilwKLCST6PUcrB8A70844CXenwILRk'+
                'IoYyBRk4BQlHo3FIOQmvAEGBMpYSop/IgPBCFpCqIuEsIESHgkgoJxwQAjSzwb1DClwwgQhgAVVM'+
                'IgVyKCEAIfkECQcAEAAsAAAAABAAEAAABWQgJI5kSQ6NYK7Dw6xr8hCw+ELC85hCIAq3Am0U6JUK'+
                'jkHJNzIsFAqDqShQHRhY6bKqgvgGCZOSFDhAUiWCYQwJSxGHKqGAE/5EqIHBjOgyRQELCBB7EAQH'+
                'fySDhGYQdDWGQyUhADs=">';
        }

        function $(id) { return document.querySelector("#"+id); }

        function addEvent(elem, evType, fn) {
            if (elem.addEventListener) {
                elem.addEventListener(evType, fn, false);
            }
            else if (elem.attachEvent) {
                elem.attachEvent("on" + evType, fn);
            }
            else {
                elem["on" + evType] = fn;
            }
        }

    }, 100);
})();
