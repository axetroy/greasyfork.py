// ==UserScript==
// @name         CSGO Blog Fix
// @namespace    https://github.com/rogeraabbccdd/CSGO-Blog-Fix/
// @version      1.0
// @description  Fix CSGO official blog background video.
// @author       rogeraabbccdd
// @include       *://blog.counter-strike.net/*
// @grant          GM_addStyle
// ==/UserScript==

GM_addStyle(`
.fullscreen-bg
{
	  position: fixed;
}
`);