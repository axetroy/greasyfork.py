// ==UserScript==
// @name AcFun官方Html5强制启用器
// @namespace esterTion
// @match http://www.acfun.cn/*
// @description 每个人都应该是锦鲤
// @grant none
// @run-at document-end
// @version 6
// ==/UserScript==

(function main() {
	var did = document.cookie.match(/_did=([^\;]+)/);
	if (!did) return setTimeout(main, 500);
	did = did[1];
	var originalDid = did + '';
	var i = 0;
	function testDid(did) {
		console.log('testing', did);
		var xhr = new XMLHttpRequest;
		xhr.open('POST', 'http://www.acfun.cn/rest/pc-direct/grayConfig/h5Player', true);
		xhr.responseType = 'json';
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		xhr.onload = function () {
			var data = this.response;
			if (!data || data.disableH5Player !== false) {
				did = originalDid + (i++);
				testDid(did);
			} else {
				console.log('setting');
				document.cookie = '_did=' + did + '; domain=acfun.cn; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT';
				if (did != originalDid) alert('html5灰测获取成功，点击确定刷新\n\n脚本可以禁用了'), location.href = location.href.split('#')[0];
			}
		};
		xhr.send('samplingId=0&resourceId=5022156&did=' + did);
	};
	testDid(did);
})();