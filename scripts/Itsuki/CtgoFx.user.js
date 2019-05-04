// ==UserScript==
// @name        CtgoFx
// @author      Itsuki
// @version     271014
// @match       http://*.chatango.com/*
// @description Remove ads and white spaces.
// @resource    CSS  https://github.com/Itsuki4/gmscripts/raw/master/chatango/style.css
// @require     http://code.jquery.com/jquery-2.1.1.min.js
// @grant       GM_getResourceText
// @grant       GM_addStyle
// @namespace https://greasyfork.org/es/users/6316-itsuki
// ==/UserScript==
/**/

// Load style sheet
var cssSrc = GM_getResourceText ("CSS");
GM_addStyle(cssSrc);


function fcol() { // Firefox fix
	document.getElementsByTagName("col")[1].style.display = 'none';
	document.getElementsByTagName("colgroup")[0].style.display = 'none';
	document.getElementsByTagName("embed")[0].style.height = "100%";
	document.getElementsByTagName("embed")[0].style.width = "100%";
}

try {
	fcol();
} catch(err) {}
