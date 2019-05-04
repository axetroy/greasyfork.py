// ==UserScript==
// @namespace     https://openuserjs.org/users/gg1aa1
// @name          最好的无广告看视频，收费和VIP视频免费看的插件！！！使用html5播放器电脑不发热不发烧
// @description   支持所有热门视频网站，优酷，爱奇艺，腾讯，搜狐，乐视，pptv，芒果tv，1905，暴风等
// @copyright     2018, gg1aa1 (https://openuserjs.org/users/gg1aa1)
// @license       MIT
// @version       0.0.1
// @match        *://v.youku.com/*
// @match        *://*.iqiyi.com/v*
// @match        *://v.qq.com/x/cover*
// @match        *://film.sohu.com/album/*
// @match        *://tv.sohu.com/v/*
// @match        *://*.le.com/ptv/vplay/*
// @match        *://v.pptv.com/show/*
// @match        *://*.mgtv.com/b/*
// @match        *://vip.1905.com/play/*
// @match        *://*.baofeng.com/*
// @grant none
// ==/UserScript==

// ==OpenUserJS==
// @author gg1aa1
// ==/OpenUserJS==

(function() {
  'use strict';
  let ok = confirm('请点击确定或按下回车，即可无广告免费播放VIP和收费视频哦！\n若无法观看请点取消，祝您观影愉快', '???')
  if (ok) {
      window.location.href = "https://z1.m1907.cn/?a=1&jx=" + window.location.href
  }
})();