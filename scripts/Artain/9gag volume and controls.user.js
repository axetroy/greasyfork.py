// ==UserScript==
// @name         9gag volume and controls
// @namespace    https://greasyfork.org/en/scripts/382093
// @match        https://9gag.com/*
// @run-at       document-start
// @grant        none
// @version      1.0.1
// @description  Adds the controls to the videos ("gifs") and sets the default volume to 30%
// @author       Artain
// @homepageURL  https://greasyfork.org/en/scripts/382093
// @license      https://creativecommons.org/licenses/by-sa/4.0/
// ==/UserScript==

(function() {
    'use strict';
    function changeVid(mutationsList, observer){
        var vids = document.querySelectorAll("video:not(.alreadyChanged)");
        for(var i=0; i < vids.length; ++i) {
            var v = vids[i];
            v.volume = 0.3;
            v.setAttribute("class", "alreadyChanged");
            v.setAttribute("controls", "")
        }
    }
    
    window.addEventListener("load", function(event) {
        changeVid(false,false);
        var observer = new MutationObserver(changeVid);

        observer.observe(document.getElementById("list-view-2"), {subtree: true, childList: true});
    });
})();