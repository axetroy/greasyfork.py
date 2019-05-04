// ==UserScript==
// @name            WME Layers Link Remover
// @description     Removes layers from links clicked/opened in Waze
// @namespace 	    vaindil
// @version         1.0
// @grant           none
// @include         https://www.waze.com/editor/*&s=*
// @include         https://www.waze.com/editor/?s=*
// @include         https://www.waze.com/*/editor*&s=*
// @include         https://www.waze.com/*/editor/?s=*
// @include         https://beta.waze.com/*&s=*
// @include         https://beta.waze.com/?s=*
// @include         https://beta.waze.com/*/*&s=*
// @include         https://beta.waze.com/*/?s=*
// @exclude         https://www.waze.com/user/*
// @exclude         https://www.waze.com/*/user/*
// @author          vaindil
// @run-at          document-start
// ==/UserScript==

window.onload = function() {
    window.stop();
    document.write('<style type="text/undefined">');
    var str = window.location.href.replace(/\?s=\d*&/, '?');
    window.location.href = str.replace(/&s=\d*/g, '');
};