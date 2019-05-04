// ==UserScript==
// @name         Add download links on Japanesepod101 site
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Search for <source> tags and append download urls below them
// @author       CometZero
// @include      *japanesepod101*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    $('audio').each(function( index ) {

        var source = $(this).find('source').attr('src');

        if ( source != '' ) {
            $(this).after('<a href="' + source + '" class="audio-download" download>Download</a>');
        }

    });

    GM_addStyle("a.audio-download{margin-top:1em;background:#eee;padding:.2em 1em;border-radius:5px;display:inline-block;text-decoration: none;color: black;}a.audio-download:hover{background:#ddd}");
})();