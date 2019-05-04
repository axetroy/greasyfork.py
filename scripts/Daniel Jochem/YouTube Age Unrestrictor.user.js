// ==UserScript==
// @name        YouTube Age Unrestrictor
// @namespace   http://userscripts.org/users/zackton
// @description A script that bypasses the YouTube age restriction.
// @author      Zackton
// @version     1.4.1.dev3
// @domain      youtube.com
// @domain      www.youtube.com
// @include     *.youtube.com/verify_age*
// @include     *youtube.com/watch*
// ==/UserScript==

if (document.getElementById("watch7-player-age-gate-content")) {
    var videoid = window.location.search.split('v=')[1];
    var ampersandPosition = videoid.indexOf('&');
    document.querySelector("#player-api").remove();
    if(ampersandPosition > -1) {
        videoid = videoid.substring(0, ampersandPosition);
    }

    var playerunavailable = window.document.getElementById("player-unavailable");
    var iframe = window.document.createElement("iframe");
    iframe.setAttribute("src", "//www.youtube.com/embed/" + videoid + "?autoplay=1&showinfo=0");
    iframe.setAttribute("id", "player-frame");
    iframe.setAttribute("style", "position:absolute; z-index:99999; width:100%; height:100%;");
    playerunavailable.appendChild(iframe);

}