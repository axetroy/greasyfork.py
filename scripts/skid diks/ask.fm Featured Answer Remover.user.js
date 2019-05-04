// ==UserScript==
// @name        ask.fm Featured Answer Remover
// @description Removes featured answers from your ask.fm feed
// @include     https://ask.fm/*
// @version     1.1.1
// @grant       none
// @icon        http://i.imgur.com/79q28PE.png
// @namespace https://greasyfork.org/users/27958
// ==/UserScript==

function nukeShit() {
    var nodesSnapshot = document.evaluate("//*[contains(text(), '? Featured') or contains(text(), '?Featured')]/..", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        nodesSnapshot.snapshotItem(i).style.display = 'none';
    }
}

window.addEventListener('DOMNodeInserted', nukeShit);