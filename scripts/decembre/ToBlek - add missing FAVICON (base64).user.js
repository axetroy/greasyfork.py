// ==UserScript==
// @name          ToBlek - add missing FAVICON (base64)
// @description   Add favicon for Toblek  [from RTM Favicon Redesigned: https://userscripts-mirror.org/scripts/review/42247]
// @version       1.00
// @author        decembre
// @namespace     decembre
// @include       http://toblek.com/*
// @require       http://code.jquery.com/jquery-latest.min.js
// @grant         GM_log

// ==/UserScript==

// PNG : https://i.imgur.com/34C3CXI.png

(function(d, h) {
	// Create this favicon
	var ss = d.createElement('link');
	ss.rel = 'shortcut icon';
	ss.type = 'image/x-icon';
	ss.href = 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACNklEQVQ4jW2TW2sTURSFv31mJslMmphbKxojUrR4ofSxIPgXBMG/6J/wXWhFS58qClaFik1MmjSTzCQzk7N9yM1Y98t+OXvttdZeR46/nyiLUlVQiEcho06Hxu4uIjBsd5glCdXWPUAQkeUI7sYwgMDlh2PynXO60wn5Qp7u6Xtcm+LXXlMIAhRWILJkoKqoKr2Ln/hv33C3aBBW5EgsnJb22Hv5ClRXACsGANN4wvjsmOQ6ZBK7VHyDAUap0h8nFJIfXH39Qm330U0JAFmSUMyBayzJJOZyYlDAwVIyMPUESWOMrLltAPxdRoQ8dm4KrMUIIAILz8z/hmcIiTiICEaUDEMqi126+dZdur/spUqR89IOtWqJab+L7wqhLeD7OYJ6GUVhYfiGhGkUEV1fc7/s8/jwKcOrkPqzB7iuQ74XotbSajU4+z1hNOjjl8qIyBxAVfl89I40Crn/pE6tGpBllihKAMH1XCplH8cIg8sL2u1ftA6eU729PQewVsm5yszY+TUyi+cIomsD02w291CUXE6wNlszYGGsGMGqcnb8iZ14wERyWMcjyCLaMyE9PEBkHuVlmN3lZZb/IMsUHfTpDgdEQQVvy2Xc6eG5DuEwBhRVO9+4BDCOYfvhPsNej6u4S07AEYsT9dGoj2uUgqOE8Qyv1iIoV7nV2EZV1xIazSaNZpM0SYm7I4rnJ1irC3qQ+lsU919wp15DzDo+cvTt4z/RADuzjAeDdWoUvMCnEAQ3QvcHNYMJeRRrEuUAAAAASUVORK5CYII=';
	// Remove any existing favicons
	var links = h.getElementsByTagName('link');
	for (var i=0; i<links.length; i++) {
		if (links[i].href == ss.href) return;
		if (links[i].rel == "shortcut icon" || links[i].rel=="icon")
			h.removeChild(links[i]);
	}
	// Add this favicon to the head
	h.appendChild(ss);
	// Force browser to acknowledge
	var shim = document.createElement('iframe');
	shim.width = shim.height = 0;
	document.body.appendChild(shim);
	shim.src = "icon";
	document.body.removeChild(shim);

})(document, document.getElementsByTagName('head')[0]);