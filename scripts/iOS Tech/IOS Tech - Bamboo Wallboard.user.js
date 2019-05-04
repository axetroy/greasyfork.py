// ==UserScript==
// @name         IOS Tech - Bamboo Wallboard
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  try to take over the world!
// @author       You
// @match        http://bamboo.hcom/telemetry.action?filter=project&projectKey=IOS
// @grant        none
// ==/UserScript==

(function() {
   'use strict';

    addGlobalStyle('body { zoom: 0.45; !important; }');
    
    // Increase the size of the plan name (to compensate for the zoom down)
    addGlobalStyle('.build .plan-name { font-size: 2.6em !important; padding-top: 3px !important; padding-bottom: 3px !important; }');
    
    // Remove the pointless 'IOS' project name (this saves us some height)
    addGlobalStyle('.build .project-name { display: none; !important; }');
    
    // Increase the size of the build time details (to compensate for the zoom down)
    addGlobalStyle('.build .build-details { padding-top: 0px; !important; }');
    addGlobalStyle('.build .build-details time { margin: 0px; !important; font-size: 1.5em; !important; }');
    
    // Increase the size of the builder name (to compensate for the zoom down)
    addGlobalStyle('.build .reason { font-size: 1.5em; !important; }');
    
    /*
    addGlobalStyle('.build .result { height: 50px; !important; padding-top: 2px; !important; }');
    addGlobalStyle('.build { margin-bottom: 5px; !important; }');
    addGlobalStyle('.build .reason { font-size: 14px; !important; }');
    */
    
})();

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}