// ==UserScript==
// @name        Hover display password
// @namespace   Jixun.Org
// @include     *://*
// @version     1
// @grant       none
// @description Display the password after hover for 300ms.
// ==/UserScript==

addEventListener ('DOMContentLoaded', function (k) {
	k = 'jixun_xD_passwd';

	document.body.addEventListener ('mouseover', function (e) {
		var t = e.target;
		t.tagName == 'INPUT' && t.type.toLowerCase() == 'password' && (
			t.setAttribute(k, 1),
			setTimeout(function(){
				t.hasAttribute(k) && (t.type = 'text')
			}, 300)
		)
	}, false);

	document.body.addEventListener ('mouseout', function (e) {
		var t = e.target;

		t.tagName == 'INPUT' && t.hasAttribute(k)
			&& (t.removeAttribute(k), t.type = 'password');
	}, false);
}, false);