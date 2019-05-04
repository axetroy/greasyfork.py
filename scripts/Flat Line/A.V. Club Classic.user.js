// ==UserScript==
// @id             avclub-classic
// @name           A.V. Club Classic
// @namespace      http://foo.bar
// @description    Change newswire links to old style, non-streaming links with comments.
// @author         flatline4400@gmail.com
// @homepage       http://greasyfork.org
// @version        0.1
// @include        http*://www.avclub.com/*
// @run-at         document-end
// ==/UserScript==



var links = document.evaluate("//a[contains(@href, 'article') and not(contains(@href, 'permalink'))]", document, null, 
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (var i=0; i < links.snapshotLength; i++) 
{ 
  var thisLink = links.snapshotItem(i); 
  thisLink.href += '?permalink=true'; 
} 

