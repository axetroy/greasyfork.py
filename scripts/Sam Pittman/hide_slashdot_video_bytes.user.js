// ==UserScript==
// @name        hide_slashdot_video_bytes
// @namespace   SamPittman
// @include     http://slashdot.org/*
// @version     1
// @grant       none
// @description This hides the "video-bytes"" thumbnails on Slashdot
// ==/UserScript==

//console.log('= Hide video-bytes =');

var badSpan = document.evaluate("//*[@class='units-12 river-group']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var badHtmlElement = badSpan.snapshotItem (0);
//console.log(badHtmlElement);
badHtmlElement.style.height = 0;
badHtmlElement.style.visibility = 'hidden';
