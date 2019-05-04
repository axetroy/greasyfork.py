// ==UserScript==
// @name        AnandTech Print View
// @namespace   http://elvencraft.com/greasemonkey
// @description Displays AnandTech articles in print view.
// @match       *://*.anandtech.com/*
// @run-at      document-end
// @version     2017.11.16
// Tested using Firefox, Chrome
// ==/UserScript==

(function ()
{
  var links = document.evaluate("//a[contains(@href, '/show/')]",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var index = 0; index < links.snapshotLength; index++)
    links.snapshotItem(index).href = links.snapshotItem(index).href
    .replace('/show/', '/print/');
})();
