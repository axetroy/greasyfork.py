// ==UserScript==
// @name         Askia - include % in title
// @version      1.0
// @description  adds a percentage done to the title (tab text) on askia surveys
// @author       You
// @match        http://*.askia.com/WebProd/cgi-bin/AskiaExt.dll?Action=DoExternalPanel*
// @grant        none
// @namespace https://greasyfork.org/users/141657
// ==/UserScript==

var ye = 0;
var nu = 0;
var interval = setInterval (() => {
     if (document.getElementById('hand')) {
         var mibi = Math.round(document.getElementById('hand').style.transform.replace(/(?!(\d|\.))./g, '') / 0.036) / 100;
         document.title = 'fuckin askia - ' + mibi + '%';
         if (nu === mibi && ++ye > 100) clearInterval(interval);
         else nu = mibi;
     }
}, 10);