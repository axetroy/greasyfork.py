// ==UserScript==
// @name         淘宝强制PC版页面
// @namespace    https://github.com/lihaoyun6/taobao2pc
// @version      0.1.1
// @description  访问到移动版淘宝页面时自动转到对应的PC版页面
// @author       lihaoyun6
// @include      *//h5.m.taobao.com*
// @run-at     	 document-start
// @grant        none
// @icon         https://www.taobao.com/favicon.ico
// ==/UserScript==
let taobaoMobileObj = {
	init () {
		let curr_href = location.href;
        let cat_arr = /detail\.htm\?id=(\d+)?/.exec(curr_href);
        if (cat_arr == null) {
			console.log('log: detail info id not found.');
			die();
		}
		let id = cat_arr[1];
		location.href = 'https://item.taobao.com/item.htm?id=' + id; // done !
	}
};

taobaoMobileObj.init();