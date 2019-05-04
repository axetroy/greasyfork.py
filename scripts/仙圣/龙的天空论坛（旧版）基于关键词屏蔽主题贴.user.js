// ==UserScript==
// @name           龙的天空论坛（旧版）基于关键词屏蔽主题贴
// @namespace      仙圣
// @description    根据关键词，屏蔽主题贴。支持配合翻页工具

// @include        http://www.lkong.net/forum.php?mod=forumdisplay*
// @include        http://www.lkong.net/forum-*.html
// @version        20190406
// @grant          none
// ==/UserScript==

blockAll();

var mo = new MutationObserver(function(allmutations) {
    blockAll();
});
mo.observe(document.querySelector('body'), {'childList': true,'characterData':false,'subtree': true});

function blockAll() {
		var dogtitles = new Array("归向","核动力战列舰","皮划艇","位面小蝴蝶","无穷重阻","井口战役",);                        //要屏蔽的标题关键字，写在这行，注意英文引号

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