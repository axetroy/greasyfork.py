// ==UserScript==
// @name         京东强制PC版页面
// @namespace    https://github.com/lihaoyun6/jd2pc
// @version      0.1.1
// @description  访问到移动版京东页面时自动转到对应的PC版页面
// @author       lihaoyun6
// @include      *//item.m.jd.com*
// @run-at     	 document-start
// @grant        none
// @icon         https://www.jd.com/favicon.ico
// ==/UserScript==
let JDMobileObj = {
	init () {
		let curr_href = location.href;
        let cat_arr = curr_href.replace(/item.m.jd.com/g, "item.jd.com");
		location.href = cat_arr; // done !
	}
};

JDMobileObj.init();