// ==UserScript==
// @name         自定义百度网盘分享密码
// @description  点击“创建私密链接”的时候弹出对话框，此时可以输入自定义密码
// @author       cofe
// @version      0.2
// @match        *://pan.baidu.com/disk/home*
// @match        *://yun.baidu.com/disk/home*
// @match        *://eyun.baidu.com/*
// @namespace https://greasyfork.org/users/96099
// ==/UserScript==

var DefPriPwd = ""; //默认分享密码,自行修改,符合规则即可

document.addEventListener('click', function (event) {
	if (event.target.title == "分享" || event.target.textContent == "分享") {
		window.setTimeout(function () {
			require(["function-widget-1:share/util/service/createLinkShare.js"]).prototype.makePrivatePassword = function () {
				return DefPriPwd ? DefPriPwd : prompt("输入自定义密码,字符数不可超过4,英文占1个字符,中文占3个字符", "");
			};
		}, 500);
	}
}, true);