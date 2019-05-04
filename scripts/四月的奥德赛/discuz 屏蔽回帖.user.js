// ==UserScript==
// @name           discuz 屏蔽回帖
// @namespace      undefined
// @version        1.0
// @include        */viewthread.php*
// @include        */thread*
// @description    解决discuz论坛屏蔽回复ID
// @include        */redirect.php*
// @include        */forum*
// @include        */forum-redirect-tid*
// @include        */forum-viewthread-tid*
// ==/UserScript==
var bl = new Array("多闻金刚1","多闻金刚","tb碧波荡漾","hzyy","hzxx","HTCH","吃瓜群众","cityonn");
for (var x in bl) {
        b = document.evaluate('//table/tbody[tr[1]/td[1]//a[text()="' + bl[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (b.snapshotLength) {
                for (var i = 0,c=""; i < b.snapshotLength; i++) {
                c = b.snapshotItem(i).firstChild.childNodes[3].textContent.replace(/\s*/g,"").slice(0,2);
                c = (Number(c) > 9)?c+" ":c;
                        b.snapshotItem(i).innerHTML = "" +" "  + "";
                }
        }
}