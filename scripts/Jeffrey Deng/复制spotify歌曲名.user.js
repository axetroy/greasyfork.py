// ==UserScript==
// @name        复制spotify歌曲名
// @name:zh     复制spotify歌曲名
// @name:en     print(copy) spotify song names
// @namespace   https://greasyfork.org/users/129338
// @version      0.1
// @description  打印出网页中spotify的歌曲名，以复制
// @description:en  print song names of spotify's playlist.
// @author       Jeffrey.Deng
// @match        http://open.spotify.com/*
// @match        https://open.spotify.com/*
// ==/UserScript==

// @weibo       http://weibo.com/3983281402
// @blog        https://imcoder.site

(function() {
    'use strict';

    // Your code here...
    var printList = function () {
        var nodes = document.querySelector("#main > div > div.Root__top-container > div.Root__main-view.Root__main-view--has-upsell-bar > div > div > div > section > div > div > div > section > ol").querySelectorAll("div > li > div.tracklist-col.name > div > div");
		if (!nodes) {
			console.warn("not find the songs nodes!!");
			return;
		}
		var playList = [];
		var song = function(_title, _singer) {
			this.title = _title;
			this.singer = _singer;
		};
		var len = nodes.length;
		for (var i = 0; i < len; i += 2) {
			var one = new song(nodes[i].innerText, nodes[i+1].innerText.replace(/\n/g, ' '));
			playList.push(one);
		}
		console.table(playList);
    }
    unsafeWindow.printList = printList;
    console.log("Now, you can type \"printList();\" in console, then will get the song names");
})();