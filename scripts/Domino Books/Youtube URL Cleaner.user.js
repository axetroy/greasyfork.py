// ==UserScript==
// @run-at document-start
// @id             Youtube URL Cleaner
// @name           Youtube URL Cleaner
// @namespace      
// @description    Removes some extra parameters from YouTube video links
// @include        http://www.youtube.com/watch?*
// @include        https://www.youtube.com/watch?*
// @version        1.2
// ==/UserScript==
var newurl = "https://www.youtube.com/watch?"+document.URL.match(/v\=[^&]*/g);
if (newurl != document.URL) location.replace(newurl);