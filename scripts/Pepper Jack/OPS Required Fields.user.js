// ==UserScript==
// @name         OPS Required Fields
// @namespace    orpheus.network
// @version      4
// @description  Make fields on upload page required so that the submit button does not work until filled in
// @author       SIGTERM86 | ported to OPS by KAPPLEJACLS
// @include      https://orpheus.network/upload.php*
// ==/UserScript==

var requiredIds = ["file", "artist", "title", "year", "releasetype", "format", "bitrate", "media", "tags"];

(function() {
    'use strict';
    for (var i=0; i<requiredIds.length; i++) {
        document.getElementById(requiredIds[i]).required = true;
    }
})();