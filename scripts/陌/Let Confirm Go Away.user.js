// ==UserScript==
// @name         Let Confirm Go Away
// @description  去除qq群共享qq旋风弹窗
// @author       陌百百<feng_zilong@163.com>
// @include      http://qun.qzone.qq.com/*
// @version      2.0
// @namespace https://greasyfork.org/users/1438
// ==/UserScript==
unsafeWindow.confirm = function(msg){return false;};
unsafeWindow.downloadFileByIframe = function(a,d){window.open (a.url + "/" + d.filename); };