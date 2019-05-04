// ==UserScript==
// @name         Mingle cash - More tv time
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  try to take over the world!
// @author       You
// @match        https://moretvtime.com/*
// @grant        none
// ==/UserScript==

(function() {
    this.$ = this.jQuery = jQuery.noConflict(true);
    var claimTimer = setInterval (function() {claim(); }, Math.floor(Math.random() * 1000) + 2000);

    function claim(){
        document.getElementsByClassName("button is-success blinking-button is-medium")[0].click();
        document.getElementsByClassName("button is-success blinking-button is-large show-popup headclass")[0].click();
        document.getElementsByClassName("vjs-big-play-button")[0].click();
        document.getElementsByClassName("vjs-tech")[0].click();
        document.getElementById('content_video').click();
        document.getElementsByClassName("delete")[0].click();
    }
    $(document).ready(function () {
	if (!window.frameElement) { //if we're not running in iframe continue
		init();
	} else {
		console.log("Not running in iFrame (URL=" + location.href + ")");
	}
        })
    function init() {
	$("#columns-holder").remove();
	$("#screen_in").remove();
	$("#videoPlayerComponent").remove();
    }
})();