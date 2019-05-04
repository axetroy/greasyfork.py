// ==UserScript==
// @name           HTML5 video auto-pause
// @author         Vincent Beers
// @namespace      http://vincent.tengudev.com/
// @description    Auto-pause any HTML5 videos. Will still preload.
// @include        *
// @version        2014-04-14
// ==/UserScript==

document.addEventListener('DOMContentLoaded',function() {
    var elems = document.querySelectorAll("video");
    
    console.log("HTML video auto pause: pausing all HTML5 videos on page load");
    for (var i = 0; i < elems.length; i++) {
        elems[i].pause();
        _tmpDaVince = elems[i]; //Probably an ugly hack, but it works at least
        _tmpDaVince.addEventListener("canplay", function(e) {
            console.log("HTML video auto pause: this video can play, so pausing");
        	_tmpDaVince.pause();
        });
    }
});



//Pause newly created video elements
document.addEventListener("DOMNodeInserted", function(e) {
    var elem = e.target;
    if (elem.nodeName == "VIDEO") {
        elem.addEventListener("canplay", function(e) {
            console.log("HTML video auto pause: Video element was inserted after page load, pausing");
        	elem.pause();
        });
    }
}, false);
