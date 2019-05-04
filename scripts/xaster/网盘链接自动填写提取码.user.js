// ==UserScript==
// @name        网盘链接自动填写提取码
// @description 自动依照整合链接填写网盘链接的提取码
// @namespace   netdisk password
// @include     http://pan.baidu.com/*
// @include     https://pan.baidu.com/*
// @include     http://yun.baidu.com/*
// @include     https://yun.baidu.com/*
// @include     http://eyun.baidu.com/*
// @include     https://eyun.baidu.com/*
// @include     http://*.yunpan.cn/*
// @include     https://*.yunpan.cn/*
// @include     http://*.yunpan.360.cn/*
// @include     https://*.yunpan.360.cn/*
// @include     http://vdisk.weibo.com/*
// @include     http://vdisk.weibo.com/*
// @include     http://share.weiyun.com/*
// @include     https://share.weiyun.com/*
// @version     1.0
// @run-at      document-start
// ==/UserScript==

(function ($, waitDocReady) {
	var site = {
		'yunpan.cn': {
			chk:  /^[a-z0-9]{4}$/i,
			code: '.pwd-input',
			btn:  '.submit-btn'
		},
		'360.cn': {
			chk:  /^[a-z0-9]{4}$/i,
			code: '.pwd-input',
			btn:  '.submit-btn'
		},
		'baidu.com': {
			chk:  /^[a-z0-9]{4}$/i,
			code: '.verify-input .pickpw input',
			btn:  '.verify-input .pickpw a.g-button'
		},
		'weibo.com': {
			chk:  /^[a-z0-9]{4}$/i,
			code: '#keypass',
			btn:  '.search_btn_wrap > a',
			preSubmit: function (codeBox, okBtn) {
				var $wt = $('.wrong_tips');
				if ($wt) {
					$wt.textContent += '；已禁用自动输入。';
					return true;
				}
				unsafeWindow.validate();
			}
		},
        'weiyun.com': {
            chk: /^[a-z0-9]{4}$/i,
			code: '#outlink_pwd',
			btn:  '#outlink_pwd_ok'
        }
	};

    waitDocReady(function () {
        console.info("DOMContentLoaded。");
		// 抓取提取码
		var sCode = location.hash.slice(1).trim(),
			hostName = location.host.match(/\w+\.\w+$/)[0].toLowerCase();

        if (sCode.length > 4 && sCode[4] == '?') {
            sCode = sCode.slice(0, 4);
        }

		var conf = site[hostName];

		// 检查是否为合法格式
		if (!conf || !conf.chk.test(sCode)) {
			// 没有 Key 或格式不对
            console.info("没有 Key 或格式不对");
			return ;
        }

		// 调试用
		console.log ('抓取到的提取码: %s', sCode);

		// 加个小延时
		setTimeout (function () {
			// 键入提取码并单击「提交」按钮，报错不用理。
			var codeBox = $(conf.code),
				btnOk = $(conf.btn);

			if (codeBox) codeBox.value = sCode;

			if (conf.preSubmit)
				if (conf.preSubmit (codeBox, btnOk, sCode))
					return ;

			if (btnOk) btnOk.click();
		}, 10);
	}, false);
})(function ($) {
	return document.querySelector ($);
}, function (callback) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(callback, 1);
    } else {
        addEventListener('DOMContentLoaded', callback, false);
    }
});