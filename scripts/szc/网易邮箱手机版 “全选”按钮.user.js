// ==UserScript==
// @name        网易邮箱手机版 “全选”按钮
// @namespace   szc
// @description 添加个“全选”按钮
// @include     http://m*.mm.mail.163.com/xm/mailbox.do*
// @version     1
// @grant       none
// ==/UserScript==

function c() {
	document.querySelectorAll('[name=mid]').forEach(e => e.checked=true);
}

function a() {
	let b = document.createElement('input');
	b.type = 'button';
	b.value = '全选';
	b.addEventListener('click', c);
	document.getElementsByClassName('grp')[0].appendChild(b);
}

a();