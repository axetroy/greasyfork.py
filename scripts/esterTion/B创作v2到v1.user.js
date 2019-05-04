// ==UserScript==
// @name        B创作v2到v1
// @namespace   esterTion
// @include     *://member.bilibili.com/v2*
// @include     *://member.bilibili.com/v/video/submit.html*
// @version     2
// @run-at      document-start
// @description 将v2新版创作中心重定向至v1旧版
// ==/UserScript==

if (/\/v\/video\/submit\.html/.test(location.href)) {
  location.href = location.href.replace('v/video/submit.html', 'video/upload.html');
  return;
}

location.href = '//member.bilibili.com/v/?force=back';