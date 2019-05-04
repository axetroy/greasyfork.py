// ==UserScript==
// @name         SteamAutoDiscoveryQueue
// @version      0.12
// @description  AutoDiscoverSteamQueue
// @author       Dogfight360
// @include      http*://store.steampowered.com/app/*
// @grant        none
// @namespace https://greasyfork.org/users/14488
// ==/UserScript==

// Your code here...

var refreshQueueBtn = document.getElementById('refresh_queue_btn');
if (refreshQueueBtn != null)
    refreshQueueBtn.children[0].click();

var nextInQueueForm = document.getElementById('next_in_queue_form');
if (nextInQueueForm != null)
    nextInQueueForm.submit();