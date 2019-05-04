// ==UserScript==
// @name           轻之国度 基于ID/标题关键词 屏蔽某些人的帖子
// @description    根据用户名、关键词，屏蔽轻之国度某些人的帖子。支持配合翻页工具（例如uAutoPagerize2）
// @namespace        lk
// @include        *://www.lightnovel.cn/viewthread.php*
// @include        *://www.lightnovel.cn/thread*
// @include        *://www.lightnovel.cn/redirect.php*
// @include        *://www.lightnovel.cn/forum-redirect-tid*
// @include        *://www.lightnovel.cn/forum-viewthread-tid*
// @include        *://www.lightnovel.cn/forum.php?mod=viewthread*
// @include        *://www.lightnovel.cn/forum.php?mod=forumdisplay*
// @include        *://www.lightnovel.cn/forum-*.html
// @version        20190211
// @grant          none
// ==/UserScript==

blockAll();

var mo = new MutationObserver(function(allmutations) {
    blockAll();
});
mo.observe(document.querySelector('body'), {'childList': true,'characterData':false,'subtree': true});

function blockAll() {
		var dogs = new Array("wgwrhya", "岁月成殇", "杜若楪葉", "我我脱裤我凉快", "cmpm", "りんごあめ", "鬼畜神攻");       //要屏蔽的ID，写在这行，注意英文引号
		var dogtitles = new Array("wgwrhya", "岁月成殇", "杜若楪葉", "我我脱裤我凉快", "cmpm", "りんごあめ", "鬼畜神攻");  //要屏蔽的标题关键字，写在这行，注意英文引号

		// 主题列表页 针对ID
		for (x in dogs) {
			dog = document.evaluate('//table/tbody[tr[1]/td[2]//cite/a[text()="' + dogs[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (dog.snapshotLength) {
				for (var i = 0, c = ""; i < dog.snapshotLength; i++) {
					dog.snapshotItem(i).innerHTML = "";
				}
			}
		}

		// 内容页 针对ID
		for (x in dogs) {
			dog = document.evaluate('//table/tbody[tr[1]/td[1]//a[text()="' + dogs[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (dog.snapshotLength) {
				for (var i = 0, c = ""; i < dog.snapshotLength; i++) {
					dog.snapshotItem(i).innerHTML = "";
				}
			}
		}

		// 主题列表页 针对标题
		for (x in dogtitles) {
			dog = document.evaluate('//table/tbody[tr[1]/th[1]/a[contains(text(),"' + dogtitles[x] + '")]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (dog.snapshotLength) {
				for (var i = 0, c = ""; i < dog.snapshotLength; i++) {
					dog.snapshotItem(i).innerHTML = "";
				}
			}
		}

}