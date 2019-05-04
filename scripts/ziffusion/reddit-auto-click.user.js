// ==UserScript==
// @name        reddit-auto-click
// @description auto clicks reddit links to move past the comments page
// @namespace   ziffusion.com
// @include     http*://*.reddit.com/r/*/comments/*
// @version     9.4
// ==/UserScript==
var results = document.evaluate('//div[@data-test-id="post-content"]//a', document, null, XPathResult.ANY_TYPE, null);
var node;
while (node = results.iterateNext()) {
  var url = new URL(node.href);
  console.log('reddit-auto-click', url);
  if (url.hostname != 'www.reddit.com') {
    window.open(url.href);
    break;
  }
}