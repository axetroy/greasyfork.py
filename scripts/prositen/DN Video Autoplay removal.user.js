// ==UserScript==
// @name         DN Video Autoplay removal
// @namespace    https://github.com/prositen
// @version      0.1
// @description  Remove autoplay from videos
// @author       prositen
// @match        *://*.dn.se/*
// @update       https://github.com/prositen/tampermonkey-scripts/raw/master/dn.autoplay-removal.user.js
// @grant        none
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @run-at       document-body
// ==/UserScript==

(function() {
    'use strict';
    var jq = jQuery.noConflict();
    jq('dn-resource[data-type=video]').each(function(i,v) {        
        jq(v).attr('data-autoplay', false);
    });

})();
