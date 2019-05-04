// ==UserScript==
// @name         Chrome 应用商店绕个弯下载
// @namespace    mscststs
// @version      0.2
// @description  可以在应用商店中下载.crx ，依赖 chrome-extension-downloader.com
// @author       mscststs
// @match      	 *://chrome-extension-downloader.com/?fromHelper*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
	'use strict';
	let My = window.location.href+"";
	let queryString = My.substr(My.indexOf("?fromHelper")+12,10000);
	if(!/chrome\.google\.com/.test(queryString)){
		window.close();
	}

	document.querySelector(".input-append>input").value = (queryString);
	document.querySelector(".input-append>button").click();
	//window.close();
	setTimeout(_=>{window.close();},60e3);





	// Your code here...
})();