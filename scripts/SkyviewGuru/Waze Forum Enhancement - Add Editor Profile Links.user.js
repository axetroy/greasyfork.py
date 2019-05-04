// ==UserScript==
// @name         Waze Forum Enhancement - Add Editor Profile Links
// @namespace    https://greasyfork.org/en/users/190349-skyviewguru
// @version      2018.06.09.1
// @description  Inserts a WME user profile link next to user names.
// @author       SkyviewGuru
// @match        https://www.waze.com/forum/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Locate any hyperlinks of mode viewprofile
    $('a[href^="./memberlist.php?mode=viewprofile"]').each(function() {
        // Insert link to user profile immediately after the forum profile link
        $(this).after(' <a target="_blank" href="https://www.waze.com/user/editor/' + $(this).text() + '">[P]</a>');
    });
})();