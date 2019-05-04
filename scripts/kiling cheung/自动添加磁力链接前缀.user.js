// ==UserScript==
// @name         自动添加磁力链接前缀
// @namespace    http://tampermonkey.net/
// @version      0.11
// @description  在你复制磁力链接的hash时候，自动补上"magnet:?xt=urn:btih:"，便于下载软件直接获取
// @author       kilin cheung
// @include      *
// @match        *
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.body.addEventListener('copy', function(e) {
    	let selectedText = window.getSelection().toString().trim();
    	if(selectedText.match(/[0-9a-zA-Z]+/)[0] == selectedText && selectedText.length == 40) {
    		let cont = 'magnet:?xt=urn:btih:' + selectedText;
	    	e.clipboardData.setData('text/plain', cont);
    		e.preventDefault();
    		return;
    	}
    });
})();