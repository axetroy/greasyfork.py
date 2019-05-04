// ==UserScript==
// @name       Scryfall default prints images view
// @version    0.1
// @description Shows image view when clicking "Prints" by default.
// @match      http*://scryfall.com/*
// @match      http*://www.scryfall.com/*
// @copyright  Aviem Zur
// @namespace https://greasyfork.org/users/14514
// ==/UserScript==

var printsLink = document.evaluate(
    '//a[contains(text(), "Prints")]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

printsLink.href = printsLink.href.replace("as=checklist&", "")