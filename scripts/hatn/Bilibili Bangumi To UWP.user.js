// ==UserScript==
// @name         Bilibili Bangumi To UWP
// @namespace    https://greasyfork.org/zh-CN/users/6065-hatn
// @version      0.1
// @description  Bangumi番剧/电影 添加 用UWP客户端打开按钮
// @icon         http://www.gravatar.com/avatar/10670da5cbd7779dcb70c28594abbe56?r=PG&s=92&default=identicon
// @author       hatn
// @copyright	 2018, hatn
// @include      *.bilibili.com/bangumi/play/ep*
// @include      *.bilibili.com/bangumi/play/ss*
// @run-at     	 document-end
// @grant        none
// ==/UserScript==

var bangumiObj = {
	init () {
		var ii = 0, max = 20, av_dom = 'info-sec-av', av_parent = 'info-second', $av_dom;
		var timer = setInterval(function() {
			++ii;
			if (ii > max) {
				clearInterval(timer);
				console.log('log: not found !');
				return false;
			}
			console.log('log: trying ' + ii + ' times');
			$av_dom = $('.' + av_dom);
			if ($av_dom.length >= 1) {
				var cat = /av(\d+)/.exec($av_dom.attr('href'));
				//console.log(cat);
				if (cat == null) {
					console.log('log: av code not found');
					return;
				}
				var av_code = cat[1];
				$('.' + av_parent + ':eq(0)').append(`<a style="margin-left: 20px;" class="${av_dom}" href="bilibili://video/${av_code}">用客户端打开</a>`);
				console.log('log: uwp btn done !');
				clearInterval(timer);
			}
		}, 600);
	}
};

bangumiObj.init();