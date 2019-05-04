// ==UserScript==
// @name         Redirect RuneScape Wikia pages to the new wiki
// @namespace    https://tomputtemans.com/
// @version      0.1
// @description  Forward any Wikia page directly to runescape.wiki
// @author       Glodenox
// @match        http://runescape.wikia.com/wiki/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

window.location.replace(window.location.href.replace('http://runescape.wikia.com/wiki', 'https://runescape.wiki/w'));