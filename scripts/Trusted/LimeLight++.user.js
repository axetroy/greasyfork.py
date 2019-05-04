// ==UserScript==
// @name         LimeLight++
// @namespace    http://nkws.pl
// @version      1.1 Stable
// @description  LimeLightGaming.net extension
// @author       Trusted - http://limelightgaming.net/index.php?action=profile;u=80
// @match        *://limelightgaming.net/*
// @grant        none
// ==/UserScript==
function init() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "http://limelight.nkws.pl/LimeLightPlusPlus.js?"+Math.random();
    var head = document.getElementsByTagName('head')[0];
    if(head) head.appendChild(script);
}
init();