// ==UserScript==
// @name         [MTURK] Queue Header Link
// @namespace    https://greasyfork.org/en/users/150063-trickydude24
// @description  Adds a link to your HITs queue into the MTurk navigational header.
// @author       Trickydude24
// @version      3.0
// @match        https://worker.mturk.com/*
// @match        https://www.mturk.com/mturk/dashboard*
// @grant        none
// ==/UserScript==

// Dashboard & Earnings Page//
if ((/^https?:\/\/(www\.)?worker\.mturk\.com\/dashboard.*/.test(location.href))||(/^https?:\/\/(www\.)?worker\.mturk\.com\/earnings.*/.test(location.href))) {
           $(".nav.navbar-nav.hidden-xs-down").append('<li class="nav-item"><a class="nav-link" href="https://worker.mturk.com/tasks">HITs Queue</a></li>');
}

// HIT Pages (Accepted and Preview pages) //
else if (/^https?:\/\/(www\.)?worker\.mturk\.com\/.*/.test(location.href)) {
    if ($(".nav.navbar-nav.hidden-xs-down")[0]){
    // HIT is in PREVIEW mode
        $(".nav.navbar-nav.hidden-xs-down").append('<li class="nav-item"><a class="nav-link" href="https://worker.mturk.com/tasks">HITs Queue</a></li>');
    }
    else {
    // HIT is ACCEPTED
    $(".col-xs-12.navbar-content a:first-child:first").after('<span style="margin: 0;"><a class="nav-link" href="https://worker.mturk.com/tasks">HITs Queue</a></span>');
           }
     }
