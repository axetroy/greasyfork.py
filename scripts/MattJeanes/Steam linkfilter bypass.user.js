// ==UserScript==
// @name          Steam linkfilter bypass
// @namespace     http://www.mattjeanes.com/
// @description   Automatically bypasses the steam linkfilter.
// @include       http*://steamcommunity.com/linkfilter/?url=*
// @run-at        document-start
// @version 0.0.1.20140723101100
// ==/UserScript==

var str = window.location.href
var search = "?url="
window.location.replace(str.substr(str.indexOf(search)+search.length))