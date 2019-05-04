// ==UserScript==
// @name         Bluestream accessibility fix
// @namespace    http://www.disabilityrightsuk.org
// @version      1.1
// @description  Switch off Bluestream animations to help disabled users
// @author       Dr S
// @include      https://*.bluestreamacademy.com/*
// @include      http://*.bluestreamacademy.com/*
// @run-at document-end
// @grant none

// ==/UserScript==

(function() {

    if (typeof window.doreveal != "undefined") {

        var s = window.doreveal.toString(); // save doreveal function's javascript code to a string

        // Make cunning modifications
        s = s.replace(new RegExp("duration:[ ]?[0-9]+\.[0-9]+","g"), "duration: 0.1"); // regular expression , g=find all
        s = s.replace(new RegExp("delay:[ ]?[0-9]+\.[0-9]+","g"), "delay: 0.1");
        s = s.replace(new RegExp("[wtf]?(\/\/)?setTimeout.\"showNext..\"[ ]?,[ ]?[0-9]+","g"), "setTimeout(\"showNext()\",1"); // wtf is to get round a bug

        // Run the doctored function!
        window.eval(s);
    }

})();