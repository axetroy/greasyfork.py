// ==UserScript==
// @name         Fanfou unfo and remove
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  shows how to use babel compiler
// @author       You
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        http://fanfou.com/*
// @match        https://fanfou.com/*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */
let token = jQuery('[token]').attr('token');
let userid = jQuery('#avatar a').attr('href').replace('/', '');
let panel = jQuery('#panel>.actions');
let btn = jQuery('<a class="bl" onClick>双向移除</a>');
btn.on('click', () => {
    if (!confirm('是否确定双向移除?')) {
		return;
	}
	let promises = [];
	let paramRemove = {
		action: 'follower.remove',
		follower: userid,
		token: token,
		ajax: 'yes'
	};
	let paramUnfo = {
		action: 'friend.remove',
		friend: userid,
		token: token,
		ajax: 'yes'
	};
	let p1 = Promise.resolve(jQuery.post('/followers', paramRemove, null, 'json'));
	let p2 = Promise.resolve(jQuery.post('/friends', paramUnfo, null, 'json'));
	Promise.all([p1, p2]).then((res) => {
		if (res[0].status == 1 && res[1].status == 1) {
			alert('成功双向移除');
            location.reload();
		} else {
			alert('移除关注者：' + res[0].msg.replace('非法操作', userid + ' 没有关注你') + '\n' + '移除关注：' + res[1].msg.replace('%s', userid));
		}
	});
});
panel.append(btn);

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */