// ==UserScript==
// @id             mybanzou@405647825@qq.com
// @name           新浪微博上显示每篇博文的真实地址并点按钮复制方便传播
// @version        0.1
// @author         405647825@qq.com
// @namespace      http://weibo.com/pendave
// @description    新浪微博上显示每篇博文的真实地址并点按钮复制方便传播！
// @include        *weibo.com*
// @exclude        *service*.weibo.com/*
// @exclude        *api.weibo.com*
// @require  https://cdn.jsdelivr.net/clipboard.js/1.5.13/clipboard.min.js
// ==/UserScript==
(function() {
	var origOpen = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function(method, url) {
		this.addEventListener('load', function() {
			console.log('XHR finished loading', method, url);
			display();
		});

		this.addEventListener('error', function() {
			console.log('XHR errored out', method, url);
		});
		origOpen.apply(this, arguments);
	};
})();
function display(){
	var weiboNodes = document.querySelectorAll('div.WB_handle');

	for (var i=0; i<weiboNodes.length; i++){
		try {
			var eachUrl = weiboNodes[i].querySelector('ul > li:nth-child(2) > a').getAttribute('action-data').split('&url=')[1].split('&')[0].trim();
			if (weiboNodes[i].querySelector('span.each') == null){
				weiboNodes[i].innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<span class="each">' + eachUrl + '</span>&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn" data-clipboard-text="'+ eachUrl + '" onclick="this.style.background=\'rgba(247,206,37,0.8)\';">拷此微博链接</button>';
			}
		}
		catch(err){
			var eUrl = weiboNodes[i].querySelector('ul > li:nth-child(2) > a');
			console.info(eUrl);
		}
	}
}
//创建按钮
	var clipboard = new Clipboard('.btn');
	clipboard.on('success', function(e) {
		console.log(e);
	});
	clipboard.on('error', function(e) {
		console.log(e);
	});