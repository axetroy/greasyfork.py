// ==UserScript==
// @name KAT Community & Latest Ups Reloader
// @author Sasidhar
// @namespace https://kat.cr/user/Sasidhar./
// @description Reloads Community page and latest Uploads page every 30 seconds
// @include https://katcr.co/show/community/index.php
// @include https://katcr.co/show/community/
// @include https://katcr.co/new/
// @version 1.4
// @grant none
// ==/UserScript==
function timedRefresh() {
	location.reload(true);
}

window.onload = setTimeout(timedRefresh,3000);