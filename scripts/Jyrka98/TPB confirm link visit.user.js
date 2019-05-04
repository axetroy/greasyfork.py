// ==UserScript==
// @name         TPB confirm link visit
// @namespace    jyrka98_script
// @version      0.9
// @description  Asks every time if you want to visit a link. Magnet links are automatically allowed and ad site redirects are automatically prevented.
// @author       Jyrka98
// @match        https://thepiratebay.org/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @noframes
// ==/UserScript==

/* jshint scripturl:true */

(function() {
    'use strict';
    function openTab(url) {
        return window.open(url, '_blank');
    }
    $('body').on('click', 'a', function (e) {
        let url = new URL(this.href);
        if (url.hostname === window.location.hostname || url.protocol === 'magnet:' || url.protocol === 'javascript:') {
            return true;
        }
        if (
            url.hostname !== 'adxprts.com' && url.hostname !== 'traffic.adxprts.com' &&
            url.hostname !== 'adxprtz.com' && url.hostname !== 'traffic.adxprtz.com' &&
             window.confirm('Go to link "' + this.href + '" ?')) {
            openTab(url);
            return false;
        }
        console.info('%c Link navigation prevented: %c ' + url, 'background: #1a1a1a; color: white;', 'background: none; color: white;');
        return false;
    });
})();