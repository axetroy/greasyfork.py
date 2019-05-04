// ==UserScript==
// @name			Bootstrap Site Navigation Userscript
// @namespace		https://github.com/anthonycl
// @version			0.1
// @description		Greasemonkey/Tampermonkey Userscript automatically fix the bootstrap site's navigation to the top as you scroll.
// @author			Anthony Fulginiti <anthony@cliklabs.com>
// @match			http://*.getbootstrap.com/*
// @include			http://*.getbootstrap.com/*
// @grant			none
// ==/UserScript==

var d = document.getElementById("top");
d.className = d.className + " navbar-fixed-top";