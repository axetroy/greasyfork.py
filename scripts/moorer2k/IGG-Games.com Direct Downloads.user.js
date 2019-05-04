// ==UserScript==
// @name         IGG-Games.com Direct Downloads
// @namespace    http://tampermonkey.net/
// @version      1.0.6
// @description  IGG Games download links all contain multiple forwarders before you get the actual download link. This automatically re-formats each available download link to be direct.
// @author       MooreR [http://moorer-software.com]
// @include      http://igg-games.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var linkSections;
    var i = 0;
    var allLinks = $('a');
    if(allLinks.length != 0){
        $.each( allLinks, function( key, value ) {
            if(value.href.indexOf('xurl=') != -1){
                //console.log(value.href);
                var linkSections = value.href.split('://');
                value.setAttribute('href', '//' + linkSections[2]);
            }
        });
    }
})();