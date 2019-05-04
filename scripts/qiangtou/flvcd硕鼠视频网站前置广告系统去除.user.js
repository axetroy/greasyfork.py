// ==UserScript==
// @name         flvcd硕鼠视频网站前置广告系统去除
// @namespace    http://weibo.com/qiangtoutou
// @version      2015年12月3日21时07分38秒
// @description  flvcd硕鼠视频网站前置广告系统去除.
// @author       qiangtou
// @match        http://www.flvcd.com/parse.php*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';


//playOverCallback函数里面会有调TSPopup.closeDiv(),这里直接赋空function
TSPopup.closeDiv=$.noop

//正则取得playOverCallback的函数名，这个名字是硕鼠后台动态生成的，每次都不一样
var playOverCallback=avdPlay.toString().match(/playOverCallback:"(\w+)"/)[1]

//把定时器里面的500ms换成100,加快执行
var newFun=window[playOverCallback].toString().replace(/\d+/g,'100')

//eval一下,生成新的function
eval(newFun)

//执行去广告回调
window[playOverCallback]()