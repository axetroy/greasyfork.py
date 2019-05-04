// ==UserScript==
// @name         南信大6小时实验学习，每5分钟Confirm确认框取消
// @name:zh-CN   南信大6小时实验学习，每5分钟Confirm确认框取消
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  针对南京信息大学实验网6小时学习用，让你在一个页面直接刷时间，不再受5分钟确认提示框干扰。
// @author       UaN
// @match        *://examsafety.nuist.edu.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
let cf = window.confirm;
window.confirm = function(...args){
	if(args[0].indexOf("5分钟")>=0){
		return true;
	}else{
		return cf(...args)
	}
}
})();