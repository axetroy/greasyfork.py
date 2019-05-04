// ==UserScript==
// @name         恢复闲鱼搜索
// @namespace    http://xuefer.win/
// @version      0.1
// @description  show search box
// @author       Xuefer
// @match        https://s.2.taobao.com/*
// @match        https://2.taobao.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var idleHeader = document.getElementById("J_IdleHeader");
	var html = idleHeader.innerHTML.toString().match(/<!--(.*?)-->/g).join('\n').replace(/<!--(.*?)-->/g, '$1');
	var div = document.createElement('div');
	div.innerHTML = html;
	idleHeader.appendChild(div);
	document.getElementById("J_HeaderSearchQuery").value = document.getElementById("J_SearchFilterInput").value;
	document.getElementById("J_SearchFilterInput").parentNode.parentNode.style.display = "block";
})();
