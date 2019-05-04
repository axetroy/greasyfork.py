// ==UserScript==
// @name         拒绝手机版闲鱼
// @namespace    https://greasyfork.org/zh-CN/users/6065-hatn
// @version      0.2.2
// @description  对 拒绝手机版页面 的补充
// @icon         http://www.gravatar.com/avatar/10670da5cbd7779dcb70c28594abbe56?r=PG&s=92&default=identicon
// @author       hatn
// @copyright	 2018, hatn
// @include      *//2.famecl.com*Copy.detail.*
// @include      *//g.alicdn.com*Copy.detail.*
// @include      *//*Copy.detail.*
// @run-at     	 document-start
// @grant        none
// ==/UserScript==
let xianyuMobileObj = {
	init () {
		let curr_href = location.href;
        let cat_arr = /Copy\.detail\.(\d+)\.?/.exec(curr_href);
        if (cat_arr == null) {
			console.log('log: detail id not found.');
			return false;
		}
		let id = cat_arr[1];
		location.href = 'https://2.taobao.com/item.htm?id=' + id; // done !
	}
};

xianyuMobileObj.init();