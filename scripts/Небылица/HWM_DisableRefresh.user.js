// ==UserScript==
// @name         HWM_DisableRefresh
// @namespace    Небылица
// @version      1.0
// @description  Отключает автообновление функцией Refresh()
// @author       Небылица
// @include      /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/.+/
// @exclude      /^https{0,1}:\/\/((www|qrator)\.heroeswm\.ru|178\.248\.235\.15)\/(login|war|cgame|frames|chat|chatonline|ch_box|chat_line|ticker|chatpost)\.php.*/
// ==/UserScript==

(function() {
    "use strict";

    var script = document.createElement("script");

    script.type = "text/javascript";
    script.innerHTML = "function Refresh(){};";

    document.getElementsByTagName("body")[0].appendChild(script);
})();