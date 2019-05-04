// ==UserScript==
// @name         Google Docs - "Docs home" link replacement
// @namespace    http://github.com/scoliono
// @version      v1.0
// @description  Changes the "Docs home" button to link you to your Drive home instead. I find this to be very convenient now that Google's made Docs and Drive separate things again.
// @author       James Shiffer
// @match        https://docs.google.com/*
// @grant        none
// ==/UserScript==

var x = document.getElementById('docs-branding-container');
x.innerHTML = '<a href="https://drive.google.com" data-tooltip="Drive home" aria-label="Drive home"><div id="docs-drive-logo"></div><img id="drive-logo" src="https://ssl.gstatic.com/docs/doclist/images/infinite_arrow_favicon_4.ico"/></a>';

var y = document.getElementById('drive-logo');
y.style.margin = '10px 3px';