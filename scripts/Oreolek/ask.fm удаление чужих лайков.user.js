// ==UserScript==
// @name        ask.fm удаление чужих лайков
// @description Удаляет посты "Вашему другу это понравилось"
// @include     https://ask.fm/*
// @version     1.0.1
// @grant       none
// @namespace https://greasyfork.org/users/6033
// ==/UserScript==

function nukeShit() {
    var nodesSnapshot = document.evaluate("//*[contains(text(), 'Вашему другу')]/..", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        nodesSnapshot.snapshotItem(i).style.display = 'none';
    }
}

window.addEventListener('DOMNodeInserted', nukeShit);