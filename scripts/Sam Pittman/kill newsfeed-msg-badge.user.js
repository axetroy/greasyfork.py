// ==UserScript==
// @name        kill newsfeed-msg-badge
// @namespace   SamPittman
// @description Hide the stupid "dancing newsfeed message" icon in Yahoo mail
// @include     https://*.mail.yahoo.com*
// @version     1
// ==/UserScript==

//console.log('= running kill newsfeed-msg-badge =');
	
var badSpan = document.evaluate("//*[@class='newsfeed-msg-badge']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var badHtmlElement = badSpan.snapshotItem (0);
//console.log(badHtmlElement);
badHtmlElement.style.visibility = 'hidden';
