// ==UserScript==
// @name         GBF-TBW
// @namespace    https://moe.best/
// @icon         http://game.granbluefantasy.jp/favicon.ico
// @version      1.3
// @license      GPL-3.0
// @description  整合 gbf-raidfinder 到 GBF 游戏网页内，并给 gbf-raidfinder 增加点击代码时自动加入 Raid 的功能（调用维拉API）
// @author       Jindai Kirin
// @match        http://game.granbluefantasy.jp/
// @match        https://gbf-raidfinder.aikats.us/
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @run-at       document-end
// ==/UserScript==

(async function () {
	'use strict';

	const TBW = GM_getValue('tbw_addr', "https://gbf-raidfinder.aikats.us/");
	const DISPLAY = GM_getValue('tbw_display', true);

	function sleep(ms) {
		return new Promise(r => setTimeout(r, ms));
	}

	GM_registerMenuCommand('设置是否在 GBF 游戏页面显示 raidfinder', () => {
		GM_setValue('tbw_display', window.confirm("显示请选“确定”，不显示请选“取消”，刷新后生效"));
	});

	GM_registerMenuCommand('自定义 raidfinder 地址', () => {
		let addr = prompt('请输入需要在 GBF 游戏页面显示的 raidfinder 网址，设置后刷新生效\n输入为空则恢复为 https://gbf-raidfinder.aikats.us/\n提醒：需要同时在脚本设置的“包括/排除”中向“用户匹配”加入该网址', TBW);
		if (addr !== null) {
			if (addr == '') addr = "https://gbf-raidfinder.aikats.us/";
			GM_setValue('tbw_addr', addr);
		}
	});

	if (window.location.hostname == 'game.granbluefantasy.jp' && DISPLAY) {
		//等待加载
		while (!($('body>div>div>div>div>nav').length > 0 && $('#wrapper').length > 0 && $('#cnt-submenu-navi-vertical').length > 0)) await sleep(500);

		GM_addStyle('#tbw{position:fixed;right:0;top:0;border:0;z-index:1000000;height:100%}');

		$('body').append(`<iframe id="tbw" src="${TBW}"></iframe>`);

		let zoom = $('#mobage-game-container').css('zoom') * 1;
		let lWidth = $('body>div>div>div>div>nav').width();
		let rWidth = $('#prt-submenu-contents').width();
		let baseWidth = $('#wrapper').width() + $('#cnt-submenu-navi-vertical').width();

		setInterval(() => {
			$('#tbw').width(`calc(100% - ${lWidth+zoom*(baseWidth+($('#prt-submenu-contents').css('display')=='none'?0:rWidth))}px)`);
		}, 300);
	} else {
		GM_addStyle('.green{color:green}.red{color:red}');

		$('body').append('<iframe id="vApi" style="display:none" src="chrome-extension://fgpokpknehglcioijejfeebigdnbnokj/content/api.html"></iframe>');

		let apiHost = document.querySelector("iframe#vApi");
		let pendingRequests = {};
		let nextRequestId = 1;

		window.addEventListener("message", onMessage, false);

		function onMessage(evt) {
			if (evt.data.type !== "result") return;

			let callback = pendingRequests[evt.data.id];
			if (callback) callback(evt.data.result);
		};

		function sendApiRequest(request, callback) {
			let id = nextRequestId++;
			request.id = id;
			pendingRequests[id] = callback;
			apiHost.contentWindow.postMessage(
				request, "*"
			);
		};

		function tryJoinRaid(code, cb) {
			sendApiRequest({
				type: "tryJoinRaid",
				raidCode: code
			}, cb);
		};

		$('body').click(() => {
			let $li = $('li.gbfrf-tweet:hover');
			let code = $li.attr('data-raidid');
			if (code) tryJoinRaid(code, result => {
				if (result == 'ok') {
					$li.find('.gbfrf-tweet__raid-id').addClass('green');
				} else {
					$li.find('.gbfrf-tweet__raid-id').addClass('red');
				}
			});
		});
	}
})();