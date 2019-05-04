// ==UserScript==
// @name         RaidCall Auto redirect
// @version      0.1
// @description  Auto redirect links from RaidCall.
// @author       MapleHuang(stan60250@gmail.com)
// @include       http://www.raidcall.com.tw/direct.tips.php?url=*
// @include       https://www.raidcall.com.tw/direct.tips.php?url=*
// @namespace https://greasyfork.org/users/160457
// ==/UserScript==

var url = window.location.href;
var match = "direct.tips.php?url=";
window.location.replace(decodeURIComponent(url.substring(match.length +  url.indexOf(match))));