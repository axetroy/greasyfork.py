// ==UserScript==
// @name           龙的天空论坛屏蔽特定用户
// @namespace    
// @include        http://*.lkong.net/forum*
// @include        http://*.lkong.net/thread*
// @version        0.2
// @description    zh-CN
// ==/UserScript==
var bl = new Array('杳马', 'tgbyhn567', '四字排行榜', 'tgbyhn56', 'happpy6','Baptist道人');
for (x in bl) {
  // 屏蔽回帖
  b = document.evaluate('//table/tbody[tr[1]/td[1]//a[text()="' + bl[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (b.snapshotLength) {
    for (var i = 0; i < b.snapshotLength; i++) {      
      b.snapshotItem(i).innerHTML = '<p>被屏蔽回复 <font color=red>' + bl[x] + '</font></p><hr/>';
    }
  }
  // 屏蔽引用
  c = document.evaluate('//blockquote[font//a[text()="@' + bl[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (c.snapshotLength) {
    for (var i = 0; i < c.snapshotLength; i++) {      
      c.snapshotItem(i).innerHTML = '<p>被屏蔽引用 <font color=red>' + bl[x] + '</font></p>';
    }
  }
  // 屏蔽主贴
  d = document.evaluate('//form/table/tbody[tr/td[2]/cite/a[text()="' + bl[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (d.snapshotLength) {
    for (var i = 0, c = ''; i < d.snapshotLength; i++) {
      d.snapshotItem(i).innerHTML = '<tr><td class="icn"/><td class="new">被屏蔽帖子<font color=red>' + bl[x] + '</font></td><td class="by"/><td class="num"/><td class="by"/></tr>';
    }
  }
}