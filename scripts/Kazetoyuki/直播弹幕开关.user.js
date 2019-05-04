// ==UserScript==
// @name                Live Danmaku Switcher
// @name:zh-CN          直播弹幕开关
// @description         Click 'M' to switch live danmaku on/off.
// @description:zh-CN   按下 'M' 开关直播弹幕.
// @namespace           live-danmaku-switcher
// @version             2019.04.18.1
// @author              kazetoyuki
// @license             MIT License
// @run-at              document-idle
// @require             https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js
// @match               *://live.bilibili.com/*
// @match               *://*.douyu.com/*
// @match               *://*.huya.com/*
// ==/UserScript==

'use strict';

var selector = {
    "bilibili": {
        "check": "i.live-icon-danmaku-on",
        "on": "i.live-icon-danmaku-on",
        "off": "i.live-icon-danmaku-off"
    },
    "douyu": {
        "check": "div[class*='removed-'][title='显示弹幕']",
        "on": "div[class*='showdanmu-'][title='关闭弹幕']",
        "off": "div[class*='hidedanmu-'][title='显示弹幕']"
    },
    "huya": {
        "check": "div[class='danmu-show-btn'][title='关闭弹幕']",
        "on": "div[class='danmu-show-btn'][title='关闭弹幕']",
        "off": "div[class='danmu-show-btn danmu-hide-btn'][title='开启弹幕']"
    }
};

function danmaku_switcher(live_site) {
    if (document.querySelector(selector[live_site].check) != null) {
        // Switch danmaku on -> off
        document.querySelector(selector[live_site].on).click();
    }
    else {
        // Switch danmaku off -> on
        document.querySelector(selector[live_site].off).click();
    }
};

$(document).keypress(function(switcher) {
    // detect 'm' or 'M' Key
    if (switcher.which === 77 || switcher.which === 109) {
        danmaku_switcher(document.domain.split('.').reverse().splice(1, 1));
    }
});
