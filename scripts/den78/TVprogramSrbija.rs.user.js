// ==UserScript==
// @name   TVprogramSrbija.rs
// @namespace    TVprogramSrbija.rs
// @description   Redirect port.rs to tvprogramsrbija.rs
// @include   http://tvprogramsrbija.rs*
// @include   http://www.tvprogramsrbija.rs*
// @include   https://tvprogramsrbija.rs*
// @include   https://www.tvprogramsrbija.rs*
// @version   1.1

// ==/UserScript==

	var links = document.evaluate(
	"//a[contains(@href, 'port.rs')]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < links.snapshotLength; i++)
	{
		var link = links.snapshotItem(i);
		link.href = link.href.replace("port.rs","tvprogramsrbija.rs");
	}