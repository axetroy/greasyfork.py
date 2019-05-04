// ==UserScript==
// @name         微信网页版全屏
// @namespace    WeiXin_叶海晨星
// @version      0.1
// @description  让网页版微信在网页内全屏
// @author       叶海晨星
// @match        https://wx.qq.com/
// @run-at       document-body
// @icon         https://res.wx.qq.com/zh_CN/htmledition/v2/images/favicon31e225.ico
// @require      http://code.jquery.com/jquery-1.x-git.min.js
// ==/UserScript==

$("div.main").css("height","100%");
$("div.main").css("padding-top","0px");
$("div.main_inner").css("max-width","100%");