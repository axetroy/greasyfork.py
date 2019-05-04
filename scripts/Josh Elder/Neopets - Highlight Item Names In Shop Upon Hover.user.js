// ==UserScript==
// @name         Neopets - Highlight Item Names In Shop Upon Hover
// @namespace    Jawsch
// @description  Highlights the Item Name in your shop when you hover over them
// @match        http://www.neopets.com/market.phtml?*type=your*
// @match        http://www.neopets.com/market_your.phtml
// @version      1.3
// ==/UserScript==

// For items in shop
[].forEach.call(document.body.querySelectorAll('td[bgcolor="#ffffcc"]:first-child'), function (e) {
	e.addEventListener("mouseover", function () {
		var selection = window.getSelection();
		var range = document.createRange();
		range.selectNodeContents(e.querySelector('b'));
		selection.removeAllRanges();
		selection.addRange(range);
	})
});