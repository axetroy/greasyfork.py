// ==UserScript==
// @name         自用三亚学院一键评教
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  一键评教
// @author       初七
// @match        http*://10.10.181.3/*
// @resource     https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js
// ==/UserScript==

(function() {

document.getElementById("iframeautoheight").onload = function() {
var iframe = document.getElementById('iframeautoheight');
var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
var selects = innerDoc.getElementsByTagName('select');
var scorelist = [];

// 找到下拉菜单列表
for (var i = 0; i < selects.length; i++) {
	if (selects[i].id.indexOf("DataGrid1__") > -1) {
		scorelist.push(selects[i]);
	}
}

//产生随机数
	var rid = Math.floor(Math.random() * scorelist.length);
// 选取下拉菜单项
for (i = 0; i < scorelist.length; i++) {
	var ops = scorelist[i].options;
	for (var j = 0; j < ops.length; j++) {
		var tempValue = ops[j].value;
		if (i == rid) {
			if (tempValue == '4') {
				ops[j].selected = true;
			}
		} else {
			if (tempValue == '5') {
				ops[j].selected = true;
			}
		}
	}
var textarea = innerDoc.getElementById("pjxx");
textarea.value = "老师教学认真负责，讲课条理清晰，举例充分恰当";
for(var C = 0;C<7;C++){
var g=innerDoc.getElementById('Button1')
g.click();
}
var g2=innerDoc.getElementById('Button2')
g2.click();
};
}
})();