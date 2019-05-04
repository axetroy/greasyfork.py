// ==UserScript==
// @name           Omni - Hide Sponsors
// @namespace      johantiden
// @description    Hides sponsored content.
// @include        http://omni.se*
// @include        https://omni.se*
// @version 0.0.1
// ==/UserScript==

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
            '.article--sponsored { display: none;';
document.getElementsByTagName("HEAD")[0].appendChild(link);