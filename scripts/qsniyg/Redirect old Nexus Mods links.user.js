// ==UserScript==
// @name Redirect old Nexus Mods links
// @description Redirects old and broken links from Nexus Mods to the new links
// @version 0.1
// @namespace Violentmonkey Scripts
// @match https://*.nexusmods.com/*
// @grant none
// @run-at document-start
// ==/UserScript==

(function() {
    var href = document.location.href;
    var match = href.match(/:\/\/([a-z]+)\.nexusmods\.com\/mods\//);
    if (match) {
        if (match[1].startsWith("static"))
            return;
        document.location = href.replace(/:\/\/[^/]*\/mods\//, "://www.nexusmods.com/" + match[1] + "/mods/");
    }
    match = href.match(/:\/\/([a-z]+)\.nexusmods\.com\/downloads\/+file\.php.*?[?^]id=([0-9]+)/);
    if (match) {
        document.location = href.replace(/:\/\/[^/]*\/.*/, "://www.nexusmods.com/" + match[1] + "/mods/" + match[2]);
    }
    match = href.match(/(:\/\/(?:www\.)?nexusmods\.com\/[^/]*)\/+downloads\/+file\.php.*?[?^]id=([0-9]+)/);
    if (match) {
        document.location = href.replace(/:\/\/[^/]*\/.*/, match[1] + "/mods/" + match[2] + "?tab=files");
    }
})();