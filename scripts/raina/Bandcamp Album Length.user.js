// ==UserScript==
// @namespace   raina
// @name        Bandcamp Album Length
// @author      raina
// @description Sums up the lengths of Bandcamp album tracks and gives you a total album runtime up top.
// @version     2.1
// @include     *
// @grant       none
// ==/UserScript==
window.self === window.top && window.siteroot && "http://bandcamp.com" == window.siteroot && (function() {
	"use strict";
    var tracks = document.querySelectorAll('#track_table .title .time');
	if (tracks.length) {
		var runtime = document.createElement("span");
		var mul = [1, 60, 60 * 60];
		var total = 0;
		var duration = "";
		var time;
		var section;
		var digits;
		var i;
		var hours;
		var minutes;
		for (i = 0; i < tracks.length; i++)	{
			time = tracks[i].textContent.trim();
			section = 0;
			while (time) {
				digits = time.slice(time.lastIndexOf(":") + 1);
				total += parseInt(digits, 10) * mul[section];
				time = time.slice(0, time.lastIndexOf(":"));
				if (!time) {
					break;
				}
				section++;
			}
		}
		hours = Math.floor(total / mul[2]);
		if (1 <= hours) {
			duration = hours + ":";
			total -= hours * mul[2];
		}
		minutes = Math.floor(total / mul[1]);
		if (duration) {
			duration += ("0" + minutes).slice(-2) + ":";
		} else {
			duration = minutes + ":";
		}
		if (1 <= minutes) {
			total -= minutes * mul[1];
		}
		duration += ("0" + total).slice(-2);
		runtime.textContent = "Total runtime: " + duration;
		runtime.style = "display: inline-block; float: right;";
		document.querySelector('#name-section h3').insertBefore(runtime, document.querySelector('#name-section h3 [itemprop="byArtist"]'));
	}
}());
