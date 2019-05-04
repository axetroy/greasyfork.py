// ==UserScript==
// @name        数据银行下载助手
// @namespace   org.jixun.dbank.downloader
// @description 更方便的下载华为网盘资源~☆
// @include     http://dl.dbank.com/*
// @include     http://dl.vmall.com/*
// @version     1
// @grant       window

// @run-at      document-start
// ==/UserScript==

var unsafeInjectScript = function (fooScript) {
	var tmpScript = document.createElement ('script');
	tmpScript.textContent = ';('+ fooScript.toString() +')();';
	document.head.appendChild (tmpScript);
	return tmpScript;
};

var jQuery = document.createElement ('script');
jQuery.src = 'http://cdn.staticfile.org/jquery/2.1.1/jquery.min.js';
document.head.appendChild (jQuery);

jQuery.onload = unsafeInjectScript.bind (null, function () {
	var $ = jQuery.noConflict ();

	$('<style>').text('.copyright-tips{display:none !important}').appendTo(document.head);


	var loopThrough  = function (aList, t, fCallback) {
		var fId = false,
			ret = {};
		console.log('Process: ', aList);
		for (var i = 0; i < aList.length; i++) {
			console.log('Check aList[' + i + '] :: ', aList[i]);
			ret = fCallback(aList[i], t);
			if (ret.ret) {
				console.log('URL GET :: ' + aList[i].downloadurl);
				fId = aList[i].downloadurl;
				break;
			} else if (aList[i].childList) {
				console.log('NEXT TRY: aList[' + i + '] :: ' + aList[i].childList);
				fId = loopThrough (aList[i].childList, t, fCallback);
				if (fId) {
					return fId;
				}
			}
		}
		return fId;
	};

	// 下载解析
	var iNv = setInterval(function () {
		// 等待相关函数
		try {
			if (!window.dbank.securelink.downloadfile)
				return;
		} catch (e) {
			return ;
		}
		clearInterval(iNv);
		console.log('dBank 解析 :: 文件列表加载完毕。');

		window.dbank.securelink.setStat =
			window.dbank.securelink.checkResourceSelected =
				function () {};

		window.dbank.securelink.downloadfile = function (ahref) {
			var fList = window.globallinkdata.data.resource.files,
				fId = loopThrough (fList, ahref.id, function (l, t) {
					return ((l.id == t) ? {
						ret: 1
					} : {});
				});
			
			if (!fId)
				return alert ('无法解析其真实地址，可能因为网站改版导致脚本失效..\n\n请提交问题和发生错误的地址反馈, 谢谢 ^^');
			
			var rA = window.dbank.crt.decrypt(fId, this.encrykey);
			console.log ('dBank 解析 :: ' + rA);
			window.open(rA, 'CUWCL4C_' + fId);
		};

		// 判断是否提示需要 VIP 帐号转存
		if (!$('#hsdownload').length) {
			loopThrough (window.globallinkdata.data.resource.files, 0, function (l) {
				$('a#' + l.id).click(function (e) {
					window.dbank.securelink.downloadfile(this);
					e.preventDefault();
				});
			});
		} else {
			// 高速下载按钮拦截
			$('<a>').click(function () {
				$('#down_filelist .list-select input[type="checkbox"]').each(function () {
					if ($(this).prop('checked'))
						window.dbank.securelink.downloadfile($(this).parent().parent().find('span.list-tit a[id]')[0]);
				});
			}).addClass('btn btn-d-hdown').insertAfter ($('#hsdownload').hide());
		}

		$('#hotkw').hide ().after($('<span>').addClass('link-key').css({
			color: 'white'
		}).text('脚本已就绪。'));

		console.log ('dBank 解析 :: 解析函数已绑定');
	}, 500);

	setTimeout (function () {
		clearInterval(iNv);
	}, 5000);
});

unsafeInjectScript (function () {
	var $global = undefined;
	Object.defineProperty (window, 'globallinkdata', {
		get: function () { return $global; },
		set: function (g) {
			for (var x in g.data.resource_ad)
				g.data.resource_ad[x] = false;
			
			g.data.buttonshow.download = g.data.buttonshow.high_speed_download = 'open';


			$global = g;
		}
	});

	var oldDWrite = document.write;
	document.write = function (r) {
		if (/hiad|baidu|script/i.test(r))
			return ;

		oldDWrite (r);
	};


	// 广告过滤 (关键函数替换)
	["BAIDU_CLB_captchaVerifiedCallback", "BAIDU_CLB_captchaBtnId",
	 "BAIDU_CLB_SLOT_ID", "BAIDU_DUP_info", "BAIDU_CLB_prepareMoveSlot",
	 "BAIDU_CLB_ORIENTATIONS", "BAIDU_DUP2_pageFirstRequestTime",
	 "BAIDU_DUP", "BAIDU_DUP_proxy", "BAIDU_CLB_fillSlot",
	 "BAIDU_CLB_singleFillSlot", "BAIDU_CLB_fillSlotWithSize",
	 "BAIDU_CLB_fillSlotAsync", "BAIDU_CLB_preloadSlots",
	 "BAIDU_CLB_addOrientation", "BAIDU_CLB_addOrientationOnce",
	 "BAIDU_CLB_setOrientationOnce", "BAIDU_CLB_setConfig",
	 "BAIDU_CLB_addSlot", "BAIDU_CLB_enableAllSlots",
	 "BAIDU_CLB_SETHTMLSLOT", "BAIDU_DUP_require", "BAIDU_DUP_define",
	 "BAIDU_DAN_materialCallback", "BAIDU_DAN_captchaAuthCallback",
	 "BAIDU_DAN_showCaptchaAd", "BAIDU_DUP2_info",
	 "BAIDU_CLB_DUP2_ORIENTATIONS", "BAIDU_CLB_DUP2_SLOT_ID", "BAIDU_DUP2",
	 "BAIDU_DUP2_proxy", "BAIDU_CLB_DUP2_fillSlot", "BAIDU_CLB_DUP2_singleFillSlot",
	 "BAIDU_CLB_DUP2_fillSlotWithSize", "BAIDU_CLB_DUP2_fillSlotAsync",
	 "BAIDU_CLB_DUP2_preloadSlots", "BAIDU_CLB_DUP2_prepareMoveSlot",
	 "BAIDU_CLB_DUP2_addOrientation", "BAIDU_CLB_DUP2_addOrientationOnce",
	 "BAIDU_CLB_DUP2_setOrientationOnce", "BAIDU_CLB_DUP2_setConfig",
	 "BAIDU_CLB_DUP2_addSlot", "BAIDU_CLB_DUP2_enableAllSlots",
	 "BAIDU_CLB_DUP2_SETHTMLSLOT", "BAIDU_DUP2_require", "BAIDU_DUP2_define",

	 'stat_cdn', 'stat_cdn_back', 'trace_ads_start',
	 'scriptDom', 'adSend'].forEach (function (e) {
		Object.defineProperty(window, e, {
			get: function () { return function () {}; },
			set: function () { /* Do nothing */ }
		});
	});
});