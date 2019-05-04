// ==UserScript==
// @name         Reddit /r/place Zoom
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Use mouse wheel to zoom
// @author       Plumbus
// @match        https://www.reddit.com/place*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var placeViewer = document.getElementById("place-viewer");

    document.addEventListener("wheel", function(e){
        e.preventDefault();
        var scale = parseFloat(placeViewer.style.transform.match(/\((.*?),/)[1]);
        scale += event.wheelDeltaY/500;
        scale = Math.max(scale, 0.1);
        placeViewer.style.transform = "scale("+ scale +"," + scale +")";
    });
})();