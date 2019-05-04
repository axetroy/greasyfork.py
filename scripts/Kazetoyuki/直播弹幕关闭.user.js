// ==UserScript==
// @name                Live Danmaku Disabler
// @name:zh-CN          直播弹幕关闭
// @description         Auto disable live streaming danmaku.
// @description:zh-CN   自动关闭直播弹幕.
// @namespace           live-danmaku-disabler
// @version             2019.04.18
// @author              kazetoyuki
// @license             MIT License
// @run-at              document-idle
// @require             https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js
// @require             https://greasyfork.org/scripts/48306-waitforkeyelements/code/waitForKeyElements.js?version=275769
// @match               *://live.bilibili.com/*
// @match               *://*.douyu.com/*
// @match               *://*.huya.com/*
// ==/UserScript==

'use strict';

var selector = {
    "bilibili": "i.live-icon-danmaku-on",
    "douyu": "div[class*='showdanmu-'][title='关闭弹幕']",
    "huya": "div[class='danmu-show-btn'][title='关闭弹幕']"
};

var live_site = document.domain.split('.').reverse().splice(1, 1);

function disable_danmaku(danmaku_switcher) {
    danmaku_switcher.click();
};

waitForKeyElements(selector[live_site], disable_danmaku, false);
