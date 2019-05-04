// ==UserScript==
// @name         指定网站跳转
// @description  自定义的相关网站自动跳转
// @namespace    https://greasyfork.org/zh-CN/scripts/372716
// @version      0.4
// @author       lqzh
// @copyright    lqzh
// @include      http*://eslint.org/*
// @include      http*://developer.mozilla.org/*
// @grant        none
// ==/UserScript==

const list = [
    {	o: "eslint.org",r: "cn.eslint.org",},
    {	o: "developer.mozilla.org/en-US",r: "developer.mozilla.org/zh-CN",},
];

(function () {
	'use strict';
	let host = location.href;
	for (let i = 0; i < list.length; i++) {
		let site = list[i];
        let keyWord = location.protocol + '//'+ site.o;
        console.log(keyWord);
		if (host.startsWith(keyWord)) {
            let re =  new RegExp("^" + keyWord);
			location.href = host.replace( re ,location.protocol + '//'+ site.r)
			break;
		}
	}
})();
