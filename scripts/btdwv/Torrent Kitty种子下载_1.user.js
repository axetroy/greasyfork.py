// ==UserScript==
// @name        Torrent Kitty种子下载_1
// @namespace   http://userscripts.org/users/useridnumber
// @description 在Torrent Kitty搜索页面直接下载种子
// @include     http://www.torrentkitty.org/search/*
// @version     1.0.1
// @grant       none
// ==/UserScript==

var tag = document.getElementsByClassName("name");
var detail;
var i = 0;
var len=document.getElementById("archiveResult").getElementsByTagName("tr").length;

for (i = 1; i < len; i++) {
	detail = tag[i].nextSibling.nextSibling.nextSibling.childNodes[0];
	url = detail.href.substring(40);

	var down_link = document.createElement("a");
	down_link.setAttribute('href', "http://torrage.com/torrent/" + url + ".torrent")
	down_link.setAttribute('style','color:red');
	down_link.appendChild(document.createTextNode('种子'));
	detail.appendChild(down_link);
}