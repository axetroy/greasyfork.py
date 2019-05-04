// ==UserScript==
// @name        USTC教学评估
// @description USTC教学评估自动好评
// @namespace   tz2012
// @include     http://mis.teach.ustc.edu.cn/pgwj.do*
// @version     v1
// @grant       none
// ==/UserScript==

var list = document.querySelectorAll('tbody tr td:first-child[width] input:nth-child(2)[type="radio"]')
for(var i = 0; i < list.length; i++) {
	list[i].click();
}
// check();
setTimeout(check, 500);
