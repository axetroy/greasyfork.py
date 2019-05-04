// ==UserScript==
// @name         Reddit Enhancements
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Some small enhancements for reddit (RES needed)
// @icon         data:image/webp;base64,UklGRrwBAABXRUJQVlA4TLABAAAvP8APAK+goG0bhj/ddv/SMJC2TXr/ls8Utm2k7L/rMT7//Mfvr29tSyUrvpCacd2glC8IERWbAUJEGSIIODeWuw1wA4Bt24Ck2AvY8P+xJmiK3pIlov8TQH/fZ6mDaTGUeR8CCB1Km1QEANhxXQRnBABIK+EzX2eh06jZP7C2t0350BpX7rYGnhlqUS6bBTIzqwQAPy+jAJUh6jlVul6LsfGTQxj67QrhxzKUH/PQfqZjDs5IMC5k7Ne1ZOBLk9pNaOGoxdeaV9Lk2Swct21mI5Vvh1DApxHwojDwKfBIl3Cx7CcSXJ1OuLvcWzL3gXpH4+hZvpW2kIioP9zTiYhwK53ocsPQMnOZlmZD9hOEgvMr5HDlOYF0tinGrDKXV4ZRjU5zUD+G5vT4qMA+9J4qk5qFTdtoFnWB4QCkgi+VhE1zLuy8G87hLXhu6jv0PEe4YZPYE8luIL0ZuELNCU64RoUL9OqwjEKiXqJ3zsfSiVAxdrxDw60ALA5iB1pg3aCX54wMgDAh5ZyCEcCKOOnCqpmDutKds+gzuky6t4bnmydUur2V6Myj1GNcLI3+LwI=
// @author       mattiadr96@gmail.com
// @match        http*://*.reddit.com/*
// @grant        none
// @noframes
// ==/UserScript==

(function($) {
    "use strict";

	// middle click to collapse
	$(document).on("mousedown", function(e) {
		if (e.button == 1) {
			// ignore links
			if ($(":hover").last().is("a")) {
				return;
			}
			let entry = $(":hover").filter(".entry").find("a.toggleChildren");
			if (entry.length > 0) {
				entry[0].click();
			}
			return false;
		}
	});

	// click on shortlink to copy
	$("#shortlink-text").on("click", function(e) {
		document.execCommand("copy");
	});

	// spoilers improvement
	/* not working
	$("head").append(`
<style type="text/css">
	a[href="/s"].hover {
		color: #f44!important;
	}

	a[href="/s"].hover:after {
		color: #FFF!important;
	}
</style>`);

	$(document).on("click", function(e) {
		let a = $(":hover").filter("a[href='/s']");
		if (a.length > 0) {
			e.preventDefault();
			a.toggleClass("hover");
		}
	});
	*/

	// color save/unsave button
	$(".save-button > a:contains('unsave')").css("color", "gold");

	$(".save-button > a").on("click", function(e) {
		e.target.style.color = (e.target.text == "save") ? "gold" : "";
	});

})(jQuery);