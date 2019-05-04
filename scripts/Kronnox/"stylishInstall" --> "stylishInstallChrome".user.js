// ==UserScript==
// @name         "stylishInstall" --> "stylishInstallChrome"
// @namespace    justin_sucks@userstyles.org
// @version      1.0
// @description  Huh? Say it again in words I understand...
// @author       me
// @match        https://userstyles.org/styles/*
// @grant        none
// ==/UserScript==

function onInstall(ev) {
	var e = new CustomEvent("stylishInstallChrome");
	document.dispatchEvent(e);
}
document.addEventListener("stylishInstall", onInstall);