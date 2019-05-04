// ==UserScript==
// @name         twitter conversation opener
// @version      0.2
// @description  expands conversations?
// @author       vG Rejected
// @match        *://twitter.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// @namespace https://greasyfork.org/users/9702
// ==/UserScript==

document.addEventListener("DOMContentLoaded", viewConversations, false );

if( document.readyState == "complete" ) {
    conversationInterval = setInterval(viewConversations(), 30000);//30 second refresh rate
}

function viewConversations() {
	$("span.expand-stream-item.js-view-details").click();
}