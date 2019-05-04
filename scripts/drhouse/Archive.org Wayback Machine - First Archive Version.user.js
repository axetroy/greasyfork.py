// ==UserScript==
// @name			Archive.org Wayback Machine - First Archive Version
// @namespace		https://greasyfork.org/en/users/10118-drhouse
// @version			1.0
// @description		Adds menu button that returns the earliest capture record of the current webpage, preventing error 404, empty or false captures.
// @include			*
// @grant           GM_getValue
// @grant           GM_setValue
// @grant			GM_registerMenuCommand
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author			drhouse
// @icon			https://archive.org/images/glogo.jpg
// ==/UserScript==

$(document).ready(function () {
    GM_registerMenuCommand("Archive First Capture", function() {
        if (location.href.toString().indexOf("https://web.archive.org/") == -1){
            window.location.href = 'https://web.archive.org/web/*/' + location;
            GM_setValue("run", true);
        }
    });

    var to_run = GM_getValue("run"); //prevents endless loop
    if (location.href.toString().indexOf("web.archive.org") != -1 && to_run === true){
        var earliest = $('#wbMeta > p:nth-child(2) > a:nth-child(2)').attr('href');
        window.location.href = 'https://web.archive.org' + earliest;
        GM_setValue("run", false);
    }
});

