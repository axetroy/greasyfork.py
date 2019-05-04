// ==UserScript==
// @name       贴吧手机版跳转
// @namespace   tiebamb2tiebapc
// @description    百度贴吧手机版自动跳转为电脑版
// @include     http://tieba.baidu.com/mo/m*
// @include     https://tieba.baidu.com/mo/m*
// @version     14.09.02.1
// @author     17yard
// @grant       none
// @icon        http://ww3.sinaimg.cn/large/5cf8ff8dgw1ehu56yclmpj20280283yb.jpg
// @namespace https://greasyfork.org/scripts/2975

// ==/UserScript==

//若不想跳转时禁用此脚本即可

location.replace(
	location.href.replace('://tieba.baidu.com/mo/m', '://tieba.baidu.com/f')
)