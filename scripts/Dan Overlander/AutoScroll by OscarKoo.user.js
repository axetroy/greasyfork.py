// ==UserScript==
// @name			AutoScroll by OscarKoo
// @namespace		COMDSPDSA
// @version			1
// @description		Fork of OscarKoo's script
// @author			Dan Overlander
// @include         https://plus.google.com/*
// @include         https://www.facebook.com/*
// @locale          English (en)
// ==/UserScript==

// Since v00: Allows manual scrolling while autoscrolling

(function(document) {
    var enable = false,
        handler = 0,
        sSpeed = 180,
        sTop,
        autoScrollToggle = function() {
            enable = !enable;
            clearTimeout(handler);
            if (enable) {
                aScroll();
            }
            else {
                sTop = undefined;
            }
        };

    document.body.removeEventListener('dblclick', autoScrollToggle);
    document.body.addEventListener('dblclick', autoScrollToggle);

    var aScroll = function() {
        if (enable) {
            if (sTop === undefined || sTop < window.scrollY) sTop = window.scrollY;
            sTop += 3;
            window.scrollTo(0, sTop);
        }
        handler = setTimeout(aScroll, sSpeed);
    };
})(document);