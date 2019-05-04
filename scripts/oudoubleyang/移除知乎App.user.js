// ==UserScript==
// @name               Remove Zhihu App
// @name:en            Remove Zhihu App
// @name:zh            移除知乎App
// @name:zh-CN         移除知乎App
// @namespace          https://www.github.com/oudoubleyang
// @namespace          https://greasyfork.org/en/users/169784-kumatea
// @version            0.1.17
// @description        Remove the annoying Zhihu App advertising tab in its Website.
// @description:zh     移除知乎移动端网页中的App强制下载链接。
// @description:zh-cn  移除知乎移动端网页中的App强制下载链接。
// @author             KumaTea
// @grant              none
// @match              https://www.zhihu.com/
// @include            http://*.zhihu.com/*
// @include            https://*.zhihu.com/*
// @homepageURL        N/A
// ==/UserScript==

document.getElementsByClassName('MobileAppHeader-downloadLink')[0].remove();
document.getElementsByClassName('Card DownloadGuide DownloadGuide-block')[0].remove();
document.getElementsByClassName('DownloadGuide-inner')[0].remove();
document.getElementsByClassName('Card DownloadGuide DownloadGuide-block DownloadGuide-block--active')[0].remove();

// IN OEDER
// MobileAppHeader-downloadLink
// Card DownloadGuide DownloadGuide-block
// DownloadGuide-inner
// Card DownloadGuide DownloadGuide-block DownloadGuide-block--active