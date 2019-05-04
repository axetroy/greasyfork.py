// ==UserScript==
// @name         去死吧！小木
// @namespace    github.com/tandf
// @version      0.0.1
// @description  干掉学堂在线中讨厌的学堂小木对话框
// @author       tandf
// @match        http://www.xuetangx.com/*
// @grant        none
// ==/UserScript==
var XiaoMu = document.getElementById('qarobot');
if (XiaoMu) {
	XiaoMu.parentNode.removeChild(XiaoMu);
}