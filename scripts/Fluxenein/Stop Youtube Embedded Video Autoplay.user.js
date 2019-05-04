// ==UserScript==
// @name         Stop Youtube Embedded Video Autoplay
// @namespace    http://superuser.com/users/481708/fluxenein
// @version      0.1
// @description  Stop autoplaying YouTube Embedded Videos.
// @author       Fluxenein
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var vid = document.getElementsByTagName("iframe");
    for (var i = 0, l = vid.length; i < l; i++) {
        var vidno = vid[i];
        var reg = new RegExp(/.*youtube.*autoplay=1.*/i);
        if (reg.test(vidno.src)){
            vidno.src=vidno.src.replace("autoplay=1", "autoplay=0");
        }
    }


})();