// ==UserScript==
// @name         Easy Picture In Picture
// @version      0.1
// @description  Enable PiP mode by clicking to video with pressed Shift
// @author       NeoCortex
// @match        *://*/*
// @run-at       document-start
// @namespace https://greasyfork.org/users/12790
// ==/UserScript==

(function() {
    document.addEventListener('click', function(e) {
                e = e || window.event;
                if(e.shiftKey) {
                    var target = e.target || e.srcElement,
                    text = target.textContent || target.innerText; 
                    if(target.nodeName == "VIDEO") {
                        if (!document.pictureInPictureElement) target.requestPictureInPicture();
                        else document.exitPictureInPicture();
                    }
                }
            }, false);
})(document)