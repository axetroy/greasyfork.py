// ==UserScript==
// @name         NoBackCMPDRP
// @namespace    gage
// @version      0.1
// @description  Disable the back button on http://cmpdrp.com/ to prevent accidental clearing
// @author       Gage LaFleur
// @include		 http://cmpdrp.com/*
// ==/UserScript==

(function() {
    'use strict';

    window.onbeforeunload = function() { return "Your presentation will be lost."; };
    
})();