// ==UserScript==
// @name        KG - less page jumps while images load
// @description	gives torrent description a scrollbar+set height, click inside to revert
// @namespace   KG
// @include     http*://*karagarga.in/details.php?*
// @exclude	http*://forum.karagarga.in/*
// @grant	none
// @version     1.2
// ==/UserScript==

if (!window.frameElement) {

        var d = document.getElementsByTagName("article")[0];
        d.style.width='650px';
        d.style.height='650px';
        d.style.overflow='auto';
        d.setAttribute("onclick", "javascript:this.style.width=''; this.style.height=''; this.style.overflow='';"); 

} // end iframe check