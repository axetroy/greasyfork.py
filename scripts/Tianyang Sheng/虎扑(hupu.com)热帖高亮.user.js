// ==UserScript==
// @name   虎扑(hupu.com)热帖高亮
// @namespace   tyshengsx@gmail.com
// @version     0.1
// @grant       none
// @include     http://bbs.hupu.com/*
// @description 回复大于150，浏览大于5000的帖子自动背景加红，字体加粗效果
// ==/UserScript==
var allpres, thispre;
allpres = document.evaluate(
    "//table[@id='ajaxtable']//td[@class='smalltxt']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (allpres.snapshotLength == 0) {
	allpres = document.evaluate(
		"//table[@id='pl']//td[@class='p_re']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
}

var reg_pre = new RegExp(/([0-9]{4,}|1{1}[5-9]{1}[0-9]{1,}|[2-9]{1}[0-9]{2,})(\s\/\s)([0-9]{5,}|[5-9]{1}[0-9]{3,})/);	


for (var i = 0; i < allpres.snapshotLength; i++) {
	thispre = allpres.snapshotItem(i);
	// 使用 thispre
	var html = thispre.innerHTML;
	    if(reg_pre.test(html)){
    	thispre.parentNode.style.backgroundColor = '#FFA07A';
    	thispre.parentNode.style.fontWeight = "bold";

    	
    }
}
