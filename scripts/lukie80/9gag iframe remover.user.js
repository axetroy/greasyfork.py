// ==UserScript==
// @name        9gag iframe remover
// @version     1.0
// @namespace   https://greasyfork.org/de/scripts/32523-9gag-iframe-remover
// @description Deletes / removes all iframes on 9gag
// @author      lukie80
// @include     http://9gag.com/*
// @include     http://9gag.com
// @include     https://9gag.com/*
// @include     https://9gag.com
// @grant       none
// ==/UserScript==

window.addEventListener("load", function(){
    var targetFrames = document.getElementsByTagName( "iframe" );
    var i;
    for (i = 0; i < targetFrames.length; i++) {
        targetFrames[i].remove();
    }
});