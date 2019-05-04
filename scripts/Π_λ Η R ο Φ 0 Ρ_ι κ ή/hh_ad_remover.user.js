// ==UserScript==
// @name     hh_ad_remover
// @description:en remove ad from hiphop.gr forum to fix problem on mobile devices
// @version  1
// @grant    none
// @include  https://www.hiphop.gr/*
// @namespace https://greasyfork.org/users/178858
// ==/UserScript==

window.addEventListener ("load", Greasemonkey_main, false);

function Greasemonkey_main () {
	document.getElementsByClassName("adform-adbox")[0].remove();
}





