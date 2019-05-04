// ==UserScript==
// @name         Middleclick everywhere
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  Lets you use middle-click to open a new tab on all sites
// @author       NKay
// @match        http://*/*
// @grant        none
// ==/UserScript==

window.addEventListener('click', function(e){
if(e.button == 1 || (e.button === 0 && e.ctrlKey)){
    e.stopPropagation();
}
}, true);