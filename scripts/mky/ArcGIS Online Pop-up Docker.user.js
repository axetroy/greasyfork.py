// ==UserScript==
// @name         ArcGIS Online Pop-up Docker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Replaces functionality of maximize button in ArcGIS Online webmap & app pop-ups, to dock the pop-up in top-right corner instead of filling the whole screen uselessly
// @author       mky
// @supportURL   https://greasyfork.org/en/scripts/375717-arcgis-online-pop-up-docker/feedback
// @match        *.maps.arcgis.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //dock on pop-up click --disabled on default
    //addGlobalStyle('.esriPopupVisible { position:absolute !important; top:auto !important; left:auto !important;  margin-top:200px }');
    //addGlobalStyle('.esriPopup .outerPointer.left {display:none !important}');

    //dock on pop-up maximize click
    addGlobalStyle('.esriPopupMaximized { left:auto !important; right: 310px !important; top: 10px !important;}'); 
    addGlobalStyle('.esriPopupMaximized .sizer {!important; width:300px !important; max-width:300px !important;}');
    addGlobalStyle('.esriPopupMaximized .sizer .contentPane { height:auto !important;  max-height:500px !important;}');

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
})();