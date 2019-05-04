// ==UserScript==
// @author       nw520
// @description  Enables you to simply paste a single line with artist and title
// @grant        none
// @icon         https://ows.elamperti.com/favicon.png
// @match        http*://ows.elamperti.com/
// @name         OneLine Scrobbler for OWS
// @namespace    https://nw520.de/
// @version      1.0
// ==/UserScript==

(function() {
	'use strict';

	function attach() {
		$("#form-manual-scrobble > fieldset > div")[2].insertAdjacentHTML('afterend', `<div class="form-group">
<div class="col-sm-3">
	<label for="oneline">OneLine</label>
</div>
<div class="col-sm-9">
	<input class="form-control oneline" name="oneline[]" aria-label="OneLine" type="text">
</div
</div>`)
		$(".btn-scrobble").mouseenter(function(e) {
			var fragments = $(".oneline").val().split(/ - | — /);
			if(fragments.length === 2) {
				$(".artist").val(fragments[0]);
				$(".track").val(fragments[1]);
				$(".oneline").val("");
			}
		 });
	}
	function detect() {
		if(window.location.href.match("http.*://ows.elamperti.com/.*")) {
			attach();
		}
	}
	detect();
})();