// ==UserScript==
// @name         filmix video to vlc
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Creating direct video file link on Filmix.
// @author       sotvm
// @include         *://filmix.*/*/*
// @grant        none
// ==/UserScript==



(function() {
    'use strict';

    // Your code here...
    function mklnk() {
        let url = $('pjsdiv video').attr('src');
        $('article.fullstory').prepend(`<a href="${url}" target="_blank" style="margin: 0;padding: 0 20px;font-size: 200%;"">Открыть в vlc</a>`);
    }

setTimeout(mklnk, 1500);
//mklnk();

})();