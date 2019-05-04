// ==UserScript==
// @name         my download weiqi json
// @namespace    https://www.101weiqi.com
// @version      0.1
// @description  nothing
// @author       You
// @match        https://www.101weiqi.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.js
// @grant        GM_info
// @grant        unsafeWindow
// @grant        GM_download
// ==/UserScript==

(function() {
    'use strict';
	const g_qq = unsafeWindow.g_qq;
	if (g_qq)
	{
		let elem = document.querySelector('#operdiv > h2');
		if (elem)
		{
			let btn = document.createElement('button');
			btn.innerHTML = "下载";
			elem.appendChild(btn);
			btn.addEventListener('click',onClickDown);
		}
	}
	function onClickDown()
	{
		let ul = document.querySelector('.breadcrumb');
		if (ul)
		{
			let name = Array.prototype.map.call(ul.children,elem=>{return elem.tagName=='LI'?elem.innerText:''}).filter(x=>x).join('-');
			let data = JSON.stringify(g_qq);
			let url = 'data:text/plain,' + data;
			var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
			saveAs(blob, name + '.json');
		}
	}
})();