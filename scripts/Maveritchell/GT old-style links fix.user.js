// ==UserScript==
// @name        GT old-style links fix
// @namespace   http://www.gametoast.com
// @description Change /forums links into regular links
// @include     http://www.gametoast.com/*
// @include     http://gametoast.com/*
// @grant       none
// @version 0.0.1.20140817045428
// ==/UserScript==

var links,thisLink;
links = document.evaluate("//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i=0;i<links.snapshotLength;i++) {
    var thisLink = links.snapshotItem(i);

    thisLink.href = thisLink.href.replace('http://gametoast.com/forums/',
                                          'http://gametoast.com/');
    thisLink.href = thisLink.href.replace('http://www.gametoast.com/forums/',
                                          'http://www.gametoast.com/');    
}