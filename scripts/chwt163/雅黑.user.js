// ==UserScript==
// @name        雅黑
// @description *
// @version     1.0
// @include       *
// @grant       none
// @namespace https://greasyfork.org/users/112688
// ==/UserScript==

var css = document.createElement('style');
var text = document.createTextNode(':not(i){font-family: "Microsoft Yahei", "Microsoft Yahei" !important; }*{text-shadow:0.00em 0.00em 0.00em #999999 !important;}');
css.appendChild(text);
document.getElementsByTagName('head') [0].appendChild(css);