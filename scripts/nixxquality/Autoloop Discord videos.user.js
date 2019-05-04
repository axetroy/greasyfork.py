// ==UserScript==
// @name         Autoloop Discord videos
// @namespace    https://greasyfork.org/en/users/3372-nixxquality
// @version      1.0
// @description  Makes videos posted in Discord loop
// @author       nixx quality <nixx@is-fantabulo.us>
// @match        https://discordapp.com/channels/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://greasyfork.org/scripts/31940-waitforkeyelements/code/waitForKeyElements.js?version=209282
// ==/UserScript==

(function() {
    'use strict';

    waitForKeyElements(
        "video",
        vid => vid.attr('loop', 'loop')
    );
})();