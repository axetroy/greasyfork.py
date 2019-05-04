// ==UserScript==
// @name           屏蔽id
// @namespace      undefined
// @version        1.1
// @include        */viewthread.php*
// @include        */thread*
// @description    解决discuz论坛屏蔽ID 
// @include        */redirect.php*
// @include        */forum*
// ==/UserScript==
var bl = new Array("多闻金刚1","多闻金刚","tb碧波荡漾","hzyy","hxxy","HTCH","吃瓜群众","cityonn","icebreey","绿屋书生");
for (var x in bl) {
         b = document.evaluate('//table/tbody[tr[1]/td[1]//a[text()="' + bl[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
         if (b.snapshotLength) {
               for (var i = 0,c=""; i < b.snapshotLength; i++) {
               c = b.snapshotItem(i).firstChild.childNodes[3].textContent.replace(/\s*/g,"").slice(0,2);
               c = (Number(c) > 9)?c+"楼":c;
                    b.snapshotItem(i).innerHTML = "被屏蔽帖子" +c+" " + bl[x] + "";
                    }
            }
    }

for (x in bl) {
            b =
    document.evaluate('//table/tbody[tr[1]/td[1]/div[1]//font[text()="' +
    bl[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
            if (b.snapshotLength) {
                    for (var i = 0,c=""; i < b.snapshotLength; i++) {
                    c =String(b.snapshotItem(i).firstChild.childNodes[3].textContent.match(/\d+#/)).replace(/#/,"楼");
                    b.snapshotItem(i).innerHTML = "被屏蔽帖子 "+c+" " + bl[x] + "";
                    }
            }
    }

    for (x in bl) {
            b =
    document.evaluate('//table/tbody[tr[1]/td[2]//cite/a[text()="' + bl[x] +
    '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if (b.snapshotLength) {
                    for (var i = 0,c=""; i < b.snapshotLength; i++) {
                    b.snapshotItem(i).innerHTML = "";
                    }
            }
    }
