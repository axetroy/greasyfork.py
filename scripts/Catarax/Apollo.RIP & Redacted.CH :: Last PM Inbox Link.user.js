// ==UserScript==
// @name	Apollo.RIP & Redacted.CH :: Last PM Inbox Link
// @description	Will make you go automatically to the last Private Message of the conversation
// @include     http*://*redacted.ch/inbox.php*
// @include     http*://*apollo.rip/inbox.php*
// @version	1.2.7
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @icon        https://redacted.ch/favicon.ico
// @grant       GM_xmlhttpRequest

// @namespace https://greasyfork.org/users/2290
// ==/UserScript==

$("#messageform").find("td").find("a").each(function() { // Inbox form -> Table TD -> Links found
    
    $this = $(this);

    var url_en_cours = $this.attr("href"); // Getting the URL data
    
    // Old URL + Anchor Link
    $this.attr("href", url_en_cours+"#messageform");

});

// Focus to the reply if possible
$("#quickpost").focus();