// ==UserScript==
// @name        wikiwiki Skip Cushion
// @namespace   mikan-megane.wikiwiki.com
// @description wikiwikiのクッションページを飛ばします
// @include     http://re.wikiwiki.jp/?*
// @version     1.1
// @grant       none
// @run-at     document-start
// ==/UserScript==

location.replace(document.URL.replace(/http:\/\/re.wikiwiki.jp\/\?/, ""));