// ==UserScript==
// @name           LOC 屏蔽垃圾帖子-PC&手机触屏版
// @namespace discuz
// @description Filters out (censors) certain posts based on the filter list, for Discuz based bbs. Made for DOLC.de, may require modifications on other domains. This script is NOT original and is published under CC.
// @description:zh Discuz 论坛在浏览器端屏蔽特定 ID 的ZZ发贴和发言。
// @description 修改来自https://greasyfork.org/zh-CN/scripts/5346
// @include        http*://www.hostloc.com/*
// @include        http*://*.hostloc.com/*
// @version 0.0.2.20180911
// ==/UserScript==


//ID列表，默认屏蔽"倾城翻翻"、"o0o"和"mikelucky "的垃圾帖子。
//可自行修改和添加，用法：入想屏蔽的 ID, 用引号包围，半角逗号区隔。
var dogs = new Array("倾城翻翻", "o0o", "mikelucky ");


// 主题列表页-PC
for (x in dogs) {
	dog = document.evaluate('//table/tbody[tr[1]/td[2]//cite/a[text()="' + dogs[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (dog.snapshotLength) {
		for (var i = 0, c = ""; i < dog.snapshotLength; i++) {
			dog.snapshotItem(i).innerHTML = "";
		}
	}
}


// 主题列表页-手机触屏版
for (x in dogs) {
	dog = document.evaluate('//div/ul/li[a/span[text()="' + dogs[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (dog.snapshotLength) {
		for (var i = 0, c = ""; i < dog.snapshotLength; i++) {
			dog.snapshotItem(i).innerHTML = "";
		}
	}
}


// 内容页-PC（手机版的暂时弄不了）
// 注：不想屏蔽回复内容，请删除该——
for (x in dogs) {
	dog = document.evaluate('//table/tbody[tr[1]/td[1]//a[text()="' + dogs[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (dog.snapshotLength) {
		for (var i = 0, c = ""; i < dog.snapshotLength; i++) {
			c = dog.snapshotItem(i).firstChild.childNodes[3].textContent.replace(/\s*/g, "").slice(0, 2);
			c = (Number(c) > 9) ? c + "楼" : c;
			dog.snapshotItem(i).innerHTML = "<b><center>清扫垃圾人人有责：被屏蔽帖子 " + c + " <font color=red>" + dogs[x] + "</font></center></b>";
		}
	}
}
// ——以内的代码即可。
// 建议配合Discuz程序论坛的黑名单，会以“还有一些帖子被系统自动隐藏，点此展开”的屏蔽方式来隐藏已拉黑的用户


for (x in dogs) {
	dog = document.evaluate('//table/tbody[tr[1]/td[1]/div[1]//font[text()="' + dogs[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (dog.snapshotLength) {
		for (var i = 0, c = ""; i < dog.snapshotLength; i++) {
			c = String(dog.snapshotItem(i).firstChild.childNodes[3].textContent.match(/\d+#/)).replace(/#/, "楼");
			dog.snapshotItem(i).innerHTML = "<b><center>c被屏蔽帖子 " + c + " <font color=red>" + dogs[x] + "</font></center></b>";
		}
	}
}