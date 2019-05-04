// ==UserScript==
// @name         Twitch Rerun Hider
// @namespace    http://grh.se
// @version      1.2.2
// @description  Hide Reruns from the following page
// @author       Markus 'Ragowit' Persson
// @include      *://www.twitch.tv/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require      https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=115012
// @comment      Based upon the work of Max Brown, "Twitch VODCAST remover".
// @comment      Thanks to Skiftcha
// ==/UserScript==

waitForKeyElements(".stream-type-indicator--rerun", hideRerun);
waitForKeyElements(".preview-card-stat--live", hideRerunLive);

function hideRerun(jNode) {
    // Good streams, they tag it as a rerun
    var node = jNode[0];
    $(node).parents(".tw-mg-b-2").hide();
}

function hideRerunLive(jNode) {
    // Mediocre streams, they don't tag it right but at least type it in the title...
    var node = jNode[0];
    var title = $(node).parents(".tw-mg-b-2").find("h3").text().toLowerCase();

    if (title.includes("rerun") || title.includes("rebroadcast")) {
        $(node).parents(".tw-mg-b-2").hide();
    }
}
