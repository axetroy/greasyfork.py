// ==UserScript==
// @name        ED2000链接去水印
// @author      mjy
// @namespace   steamcommunity.com/id/mjy
// @description 自动去掉下载链接中添加的ED2000.COM字串
// @include     http://www.ed2000.com/*
// @version     0.1
// @icon        http://www.ed2000.com/favicon.ico
// @license     GPL version 3 or any later version
// @grant       none
// ==/UserScript==
var links = document.getElementsByTagName('a');
var regex = /^(ed2k:\/\/)(\|file\|)([^|]*(?=\(ED2000))(\(ED2000\.COM\))(.+)$/g;
for (var i = 0, imax = links.length; i < imax; i++) {
  links[i].href = links[i].href.replace(regex, '$1$2$3$5');
}
