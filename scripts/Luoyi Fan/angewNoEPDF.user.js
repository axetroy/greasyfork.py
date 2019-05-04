// ==UserScript==
// @name         angewNoEPDF
// @namespace    no
// @version      0.023
// @description  To rewrite the link end by pdf
// @author       fanll
// @match        http://onlinelibrary.wiley.com/*
// @match        https://onlinelibrary.wiley.com/*
// @match        https://www.onlinelibrary.wiley.com/*
// @match        https://pericles.pericles-prod.literatumonline.com/*
// @grant        none
// ==/UserScript==

var links,thisLink;
links = document.evaluate("//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i=0;i<links.snapshotLength;i++) {
    var thisLink = links.snapshotItem(i);

    thisLink.href = thisLink.href.replace(/epdf/i, 'pdf');

}