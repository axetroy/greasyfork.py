// ==UserScript==
// @name         慧慧购物去你鸭
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @description  try to take over the world!
// @author       You

// @match	*://*.amazon.com/*
// @match	*://*.amazon.cn/*
// @match	*://*.buy.qq.com/*
// @match	*://*.suning.com/*
// @match   *://*.taobao.com/*
// @match   *://*.tmall.com/*
// @match   *://*.jd.com/*
// @match   *://*.jd.cn/*

// @grant        unsafeWindow
// @require      https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.js
// ==/UserScript==

(function() {
    'use strict';

	// 参数
    const retryDelay = 200;
    // 7s
	const timeout = 7;

	// 初始化变量
    const retryTimes = timeout * 1000 / retryDelay;
    var res_priceBar = false;
    var res_bottomoBar = false;
    var times_priceBar = 0;
    var times_bottomBar = 0;

    // work entry...
    var work_priceBar = setInterval(() => {
        $('.hui-show-long li:last-child div')
	        ? remove_priceBar()
			: finish_priceBar();
    }, retryDelay);
    var work_bottomBar = setInterval(() => {
         if(! $('.hui-minishoppingtool')[0]) {
	        remove_bottomBar();
         } else {
	        finish_bottomBar();
         }
    }, retryDelay);

    // call methods...
    function remove_priceBar() {
        $('.hui-show-long li:last-child div').remove();
        $('.hui-show-long').css('minHeight','0px');
        res_priceBar = true;
    }
    function remove_bottomBar() {
        var e = $("[hui-type='switch']")[0];
        if(e) {
            e.click();
            res_bottomoBar = true;
        }
    }
    function finish_priceBar() {
        times_priceBar ++;
        if (res_priceBar || times_priceBar >= retryTimes - 1) {clearInterval(work_priceBar)};
    }
    function finish_bottomBar() {
        times_bottomBar ++;
        if (res_bottomoBar || times_bottomBar >= retryTimes - 1) {clearInterval(work_bottomBar)};
    }
})(
);
