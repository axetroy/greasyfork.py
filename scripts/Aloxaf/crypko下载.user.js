// ==UserScript==
// @name         crypko下载
// @namespace    YinTianliang-i
// @version      0.2
// @description  下载女儿/老婆/邪神
// @author       YinTianliang
// @include      *://crypko.ai/*
// @grant        GM_download
// @grant        GM_sleep
// @grant        unsafewindow
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    if (! /crypko.ai\/#\/my-cards/.test(location.href)) {
    	return;
    }
    function download_page() {
        let waifus = document.getElementsByClassName('progressive-image-main');
        let names  = document.getElementsByClassName('card-headline');

		for (let i = 0; i < waifus.length; i++) {
			let src  = waifus[i].src.replace(/sm(?=.jpg)/, 'lg');
			let name = names[i].textContent + '.jpg';
		    GM_download(src, name);
		}
    }

    function sleep (time) {
 		return new Promise((resolve) => setTimeout(resolve, time));
	}

    (async ()=>{
    	while (true) {
		    let tooltip = document.getElementsByClassName('tooltip')[0];
			try {
		     	tooltip.innerHTML += '<a id="downloader">下载女儿/老婆/邪神</a>';
		     	document.getElementById('downloader').addEventListener('click', download_page, false);
		     	break;
		    } catch (e) {
		     	await sleep(200);
		    }
		}
	})();

})();

