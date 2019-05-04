// ==UserScript==
// @name           Discuz论坛 基于ID/标题关键词 屏蔽帖子
// @namespace      lisanye
// @description    根据用户名、关键词，屏蔽帖子。支持配合翻页工具（例如uAutoPagerize2）
// @include        */viewthread.php*
// @include        */thread*
// @include        */redirect.php*
// @include        */forum-redirect-tid*
// @include        */forum-viewthread-tid*
// @include        */forum.php?mod=viewthread*
// @include        */forum.php?mod=forumdisplay*
// @include        */forum-*.html
// @version        20171009
// @grant          none
// ==/UserScript==

blockAll();

var mo = new MutationObserver(function(allmutations) {
    blockAll();
});
mo.observe(document.querySelector('body'), {'childList': true,'characterData':false,'subtree': true});

function blockAll() {
		var dogs = new Array("hh2", "捧雪填井", "liyang", "西湖香雪", "balatu", "liuliuxe", "打烂狗头", "恶心猪王");    //要屏蔽的ID，写在这行，注意英文引号
		var dogtitles = new Array("签到", "水果乐园");                        //要屏蔽的标题关键字，写在这行，注意英文引号

		// 主题列表页 针对ID
		for (x in dogs) {
			dog = document.evaluate('//table/tbody[tr[1]/td[2]//cite/a[text()="' + dogs[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (dog.snapshotLength) {
				for (var i = 0, c = ""; i < dog.snapshotLength; i++) {
					//dog.snapshotItem(i).innerHTML = "<tr><td class='icn'><img src='static/image/common/folder_common.gif' /></a></td><th class='common'><b>造谣一时爽，全家火葬场：被屏蔽帖子 " + c + "<font color=red></th><td class='by'><cite><font color=red>" + dogs[x] + "</font></cite></td><td class='num'></td><td class='by'></td></tr>";
					dog.snapshotItem(i).innerHTML = "";
				}
			}
		}

		// 内容页 针对ID
		for (x in dogs) {
			dog = document.evaluate('//table/tbody[tr[1]/td[1]//a[text()="' + dogs[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (dog.snapshotLength) {
				for (var i = 0, c = ""; i < dog.snapshotLength; i++) {
					//c = dog.snapshotItem(i).firstChild.childNodes[3].textContent.replace(/\s*/g, "").slice(0, 2);
					//c = (Number(c) > 9) ? c + "楼" : c;
					//dog.snapshotItem(i).innerHTML = "<font color='#999'><center>" + c + " " + dogs[x] + "</center></font>";
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

		// 不明
		for (x in dogs) {
			dog = document.evaluate('//table/tbody[tr[1]/td[1]/div[1]//font[text()="' + dogs[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (dog.snapshotLength) {
				for (var i = 0, c = ""; i < dog.snapshotLength; i++) {
					c = String(dog.snapshotItem(i).firstChild.childNodes[3].textContent.match(/\d+#/)).replace(/#/, "楼");
					dog.snapshotItem(i).innerHTML = "<b><center>c被屏蔽帖子 " + c + " <font color=red>" + dogs[x] + "</font></center></b>";
					//dog.snapshotItem(i).innerHTML = "";
				}
			}
		}
}