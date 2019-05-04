// ==UserScript==
// @name         Google search history deleter helper
// @namespace    nopantsu
// @version      0.2
// @description  Will select all items on page and click remove button until everything is deleted.
// @match        https://history.google.com/history/*
// @grant        none
// ==/UserScript==

if (document.getElementById("div0")) {
	setAllChecks();
	document.getElementsByClassName("kd-button")[1].click();
}