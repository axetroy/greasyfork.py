// ==UserScript==
// @name        WWT - Shoutbox History
// @namespace   superiorSilicon
// @description Adds the "History" back under the shoutbox
// @include     *worldwidetorrents.eu/
// @include     *worldwidetorrents.eu/index.php
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1.1
// @grant       none
// ==/UserScript==

var place = $(".shoutbox_messageboxback > td:nth-child(3)");

var thing = ` - <a href="https://worldwidetorrents.eu/shoutbox.php?history=1" target="_blank"><small>History</small></a>`;

place.append(thing);