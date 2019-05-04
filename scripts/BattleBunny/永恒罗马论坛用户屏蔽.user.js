// ==UserScript==
// @name           永恒罗马论坛用户屏蔽
// @namespace      sempre-roma.com/destro
// @description    屏蔽与相应用户有关的所有内容
// @include        http://*.sempre-roma.com/*
// @version        1.0
// ==/UserScript==
var ID = new Array("用户名1", "用户名2", "用户名3", "以此类推");    //用户名屏蔽列表 (标点符号为半角)
var displaymessage = false;                                         //如需显示屏蔽提示请将"false"改为"true"

for (var x in ID) {
	thread = document.evaluate('//table/tbody[tr[1]/td[2]//cite/a[text()="' + ID[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (thread.snapshotLength) {
		for (var i = 0; i < thread.snapshotLength; i++) {
		     if(displaymessage) {
			     thread.snapshotItem(i).innerHTML = "<tr><td class='icn'><img src='static/image/common/folder_common.gif' /></a></td><th class='common'><b>已屏蔽主题 " + "<font color=grey></th><td class='by'><cite><font color=grey>" + ID[x] + "</font></cite></td><td class='num'></td><td class='by'></td></tr>";
			 }
			 else {
			         thread.snapshotItem(i).innerHTML = "";
		     }
		}
	}
	post = document.evaluate('//table/tbody[tr[1]/td[1]//a[text()="' + ID[x] + '"]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (post.snapshotLength) {
		for (var i = 0, c = ""; i < post.snapshotLength; i++) {
			c = post.snapshotItem(i).firstChild.childNodes[3].textContent.replace(/\s*/g, "").slice(0, 3);
			c = (Number(c) > 99) ? c + "#" : c;
			if(displaymessage) {
			     post.snapshotItem(i).innerHTML = "<b><center>已屏蔽" + c + " <font color=grey>" + ID[x] + "</font></center></b>";
			 }
			 else {
			         post.snapshotItem(i).innerHTML = "";
		     }
		}
	}
	 quote = document.evaluate('//blockquote[font/a/font[contains(text(),"' + ID[x] + '")]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
     if (quote.snapshotLength) {
        for (var i = 0; i < quote.snapshotLength; i++) {
			 if(displaymessage) {
			     quote.snapshotItem(i).innerHTML = '<b>已屏蔽引用 <font color=grey>' + ID[x] + '</font></b>';
			 }
			 else {
			         quote.snapshotItem(i).innerHTML = '<br />';
		     }
		}
	}
	 title = document.evaluate('//table/tbody[tr[1]/th[1]//a[contains(text(),"' + ID[x] + '")]]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (title.snapshotLength) {
				for (var i = 0, c = ""; i < title.snapshotLength; i++) {
					title.snapshotItem(i).innerHTML = "";
				}
			}

}