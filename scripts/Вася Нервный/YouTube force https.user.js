// ==UserScript==
// @name         YouTube force https
// @namespace    http://your.homepage/
// @version      0.1
// @description  Forsed https: for youtube. No more irritating page reloads. Very simple script.
// @author       You
// @include       http://*youtube.com*
// @grant        none
// @run-at document-start
// ==/UserScript==

var t = window.location.href;
if(window.location.protocol==='https:'){
    return;
}
var p = t.replace('http', 'https');
window.location.href = p;