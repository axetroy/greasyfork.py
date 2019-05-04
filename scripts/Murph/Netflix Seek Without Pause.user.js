// ==UserScript==
// @name         Netflix Seek Without Pause
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  Seek using arrow keys without pausing the video
// @author       Plumbus
// @match        https://www.netflix.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function keyPrs($$element, $$num, $$ctrlKey, $$shiftKey, $$altKey) {

        function keyEvent($$el, $$ev) {
            var $$eventObj = document.createEvent('Events');
            $$eventObj.initEvent($$ev, true, true);

            $$eventObj.keyCode = $$num;
            $$eventObj.which = $$num;
            $$eventObj.ctrlKey = $$ctrlKey;
            $$eventObj.shiftKey = $$shiftKey;
            $$eventObj.altKey = $$altKey;

            $$el.dispatchEvent($$eventObj);
        }

        keyEvent($$element, "keydown");
        keyEvent($$element, "keypress");
        keyEvent($$element, "keyup");
        //console.log($$num);
    }

    // Rewind/Forward
    document.body.onkeydown = function(e) {
        if (document.getElementsByTagName('video').length === 0) {
            return;
        }
        if (e.keyCode == 37 || e.keyCode == 39) {
            setTimeout(function(){
                keyPrs(document.querySelector('.nf-big-play-pause'), 32, false, false, false);
            },10);

        }
    };

})();