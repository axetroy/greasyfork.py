// ==UserScript==
// @name                bilibili Danmaku Disabler
// @name:zh-CN          bilibili 弹幕关闭
// @description         Auto disable bilibili HTML5 player danmaku.
// @description:zh-CN   自动关闭哔哩哔哩 HTML5 播放器弹幕.
// @namespace           bilibili-danmaku-disabler
// @version             2019.04.18
// @author              kazetoyuki
// @license             MIT License
// @run-at              document-idle
// @require             https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js
// @require             https://greasyfork.org/scripts/48306-waitforkeyelements/code/waitForKeyElements.js?version=275769
// @match               *://www.bilibili.com/video/*
// @match               *://www.bilibili.com/bangumi/play/*
// ==/UserScript==

'use strict';

var selector = {
    "new_player": "input.bui-checkbox:checked",
    "old_player": "div.bilibili-player-video-btn-danmaku[name='ctlbar_danmuku_on']"
};

function disable_danmaku(danmaku_switcher) {
    danmaku_switcher.click ();
};

waitForKeyElements(selector.new_player, disable_danmaku, false);
waitForKeyElements(selector.old_player, disable_danmaku, false);
