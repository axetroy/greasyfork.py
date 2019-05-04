// ==UserScript==
// @name         Alert Vultr VPS
// @namespace    hobo6019@gmail.com
// @version      4
// @description  Vultr VPS 可用提醒
// @author       hobo6019
// @run-at       document-end
// @include      /^https://my.vultr.com/deploy/(\?DCID\=[0-9]+\&VPSPLANID\=[0-9]+\&AutoBuy\=[0-9]+)?$
// ==/UserScript==

(function () {
	'use strict';

	if (Notification && Notification.permission !== "granted") {
		Notification.requestPermission(function (status) {
			if (Notification.permission !== status) {
				Notification.permission = status;
			}
		});
	}

	if (window.location.search == "") {
		var dcList = {
			"1": "美国 - 纽约",
			"2": "美国 - 芝加哥",
			"3": "美国 - 达拉斯",
			"4": "美国 - 西雅图",
			"5": "美国 - 洛杉矶",
			"6": "美国 - 亚特兰大",
			"7": "荷兰 - 阿姆斯特丹",
			"8": "英国 - 伦敦",
			"9": "德国 - 法兰克福",
			"12": "美国 - 硅谷",
			"19": "澳大利亚 - 悉尼",
			"24": "法国 - 巴黎",
			"25": "日本 - 东京",
			"39": "美国 - 迈阿密",
			"40": "新加坡 - 新加坡"
		};

		var dcString = "提醒购买地点（取消即手动购买）\n\n";

		for (var id in dcList) {
			dcString += id + ": " + dcList[id] + "\n";
		}

		var DCID = prompt(dcString);

		if (DCID == null || dcList[DCID] === undefined) {
			return;
		}

		var vpsPlanList = {
			"29": "$5 1CPU 768M内存 15G固态 1000G流量",
			"93": "$10 1CPU 1024M内存 20G固态 2000G流量",
			"94": "$20 2CPU 2048M内存 45G固态 3000G流量",
			"95": "$40 4CPU 4096M内存 90G固态 4000G流量",
			"96": "$80 6CPU 8192M内存 150G固态 5000G流量",
			"97": "$160 8CPU 16384M内存 300G固态 6000G流量",
			"98": "$320 16CPU 32768M内存 600G固态 10000G流量",
			"100": "$640 24CPU 65536M内存 700G固态 15000G流量",
			"87": "$5 1CPU 512M内存 125G机械 1000G流量",
			"88": "$10 1CPU 1024M内存 250G机械 2000G流量",
			"89": "$20 1CPU 2048M内存 500G机械 3000G流量",
			"90": "$30 2CPU 3072M内存 750G机械 4000G流量",
			"91": "$40 2CPU 4096M内存 1000G机械 5000G流量",
			"115": "$60 2CPU 8192M内存 120G独服 10000G流量",
			"116": "$120 4CPU 16384M内存 2*120G独服 20000G流量",
			"117": "$180 6CPU 24576M内存 3*120G独服 30000G流量",
			"118": "$240 8CPU 32768M内存 4*120G独服 40000G流量",
		};

		var vpsPlanString = "提醒购买VPS配置（取消即手动购买）\n\n";

		for (var id in vpsPlanList) {
			vpsPlanString += id + ": " + vpsPlanList[id] + "\n";
		}

		var VPSPLANID = prompt(vpsPlanString);

		if (VPSPLANID == null || vpsPlanList[VPSPLANID] === undefined) {
			return;
		}

		var AutoBuy = prompt("是否自动购买(1为自动购买, 0为仅提醒)", "0");

		if (AutoBuy != "1") {
			AutoBuy = "0";
		}
	}
	else {
		var s = window.location.search.split("&");
		var DCID = s[0].substr(6);
		var VPSPLANID = s[1].substr(10);
		var AutoBuy = s[2].substr(8);
	}

	var avail = availability[DCID][VPSPLANID];

	if (avail == "yes") {
		var titleText = "您要的VPS已经可用！！！！！";

		var options = {
			dir: "ltr",
			lang: "utf-8",
			icon: "https://www.vultr.com/favicon.ico",
			body: "请赶快购买！！！！！"
		};

		if (Notification && Notification.permission === "granted") {
			var n = new Notification(titleText, options);
		}
		if (AutoBuy == "1") {
			$("input#DCID" + DCID)[0].click();
			$("input#VPSPLANID" + VPSPLANID)[0].click();
			var ipv6_enabled = $("#ipv6_enabled")[0];
			if (ipv6_enabled.checked == false) {
				ipv6_enabled.click();
			}
			var private_network = $("#private_network")[0];
			if (private_network.checked == false) {
				private_network.click();
			}
			$("#confirmodersubmit")[0].click();
		}
		else {
			alert(titleText + "\n" + options.body);
		}
	}
	else {
		window.setTimeout(
			function () {
				if (window.location.search == "") {
					window.location = window.location + "?DCID=" + DCID + "&VPSPLANID=" + VPSPLANID + "&AutoBuy=" + AutoBuy;
				}
				else {
					window.location.reload();
				}
			}
			, 10 * 1000
		);
	}
})();