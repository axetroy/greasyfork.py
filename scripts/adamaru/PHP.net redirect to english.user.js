// ==UserScript==
// @name         PHP.net redirect to english
// @namespace    https://greasyfork.org/en/scripts/40797-php-net-redirect-to-english
// @version      0.3
// @description  redirects to English version of the documentation
// @author       adamaru
// @match        http://php.net/manual/*
// @match        https://secure.php.net/manual/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

/* jshint esversion: 6 */

(function() {
    'use strict';

    const url = window.location.href;
    const regex = /(https?:\/\/(?:secure\.)?php\.net\/manual\/)([^\/]+)(\/.*)/gm;
    const match = regex.exec(url);

    if(!match){
        return;
    }

    if(match[2] === 'en'){
        return;
    }

    const newUrl = match[1] + 'en' + match[3];
    window.location.replace(newUrl);
})();