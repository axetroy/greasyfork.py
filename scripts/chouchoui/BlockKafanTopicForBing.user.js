// ==UserScript==
// @name BlockKafanTopicForBing
// @namespace BlockKafanTopicForBing
// @include http://cn.bing.com/search*
// @version 1
// @description Bing搜索结果中屏蔽卡饭教程
// @grant none
// ==/UserScript==
document.onload = function () {
	var citeList = document.getElementsByTagName('cite');
	var searchList = document.getElementById('b_results');
	for (var index = citeList.length - 1; index >= 0; index--) {
		var element = citeList[index];
		if (element.innerHTML.indexOf('http://www.kafan.cn/topic/') > - 1) {
			var trash = element.parentNode.parentNode.parentNode;
			searchList.removeChild(trash);
		}
	}
}