// ==UserScript==
// @name       网易新年背景屏蔽
// @namespace    mscststs
// @version      0.1
// @description  网易新年背景屏蔽= =
// @author       mscststs
// @match        http*://www.163.com/
// @grant        none
// @require https://greasyfork.org/scripts/38220-mscststs-tools/code/MSCSTSTS-TOOLS.js?version=249281
// ==/UserScript==

(function() {
    'use strict';
	 async function start(){
	 	let k = await mscststs.wait("#js_festival_wrap > div.festival_main > span.close_fastival");
		k.click();
	 }
	start();

})();