// ==UserScript==
// @name       谷歌链跳转谷歌日本可防右键搜图404
// @namespace   ggcom2ggcojp
// @description    谷歌com链跳转谷歌日本cojp
// @include     http://www.google.com/*
// @include     https://www.google.com/*
// @exclude     https://www.google.com/calendar/*
// @exclude     https://www.google.com/settings/*
// @version     14.08.28.1
// @author     17yard
// @grant       none
// @icon        http://ww3.sinaimg.cn/large/5cf8ff8dgw1ehu56yclmpj20280283yb.jpg
// @namespace https://greasyfork.org/scripts/2871

// ==/UserScript==

//此脚本只为防止.com在个人电脑出现的404情况（好吧我承认可能真的只是我个人网络情况的问题），co.jp的访问可能需要科学上网

location.replace(
	location.href.replace('://www.google.com', '://www.google.co.jp')
)