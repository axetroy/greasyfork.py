// ==UserScript==
// @name        FanFiction.Net Accesskey Navigation
// @namespace   Crazycatz00
// @description Ctrl + Arrow key navigation.
// @icon        data:image/png;base64,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
// @match       *://*.fanfiction.net/s/*
// @match       *://*.fictionpress.com/s/*
// @version     1.2.2
// @grant       none
// ==/UserScript==

var moveChap = function(ofs){
	var maxChap;
	if (window.storyid && window.chapter
		&& (ofs += window.chapter) > 0
		&& (maxChap = document.getElementById('profile_top'))
		&& (maxChap = /Chapters:\s*(\d+)/.exec(maxChap.textContent))
		&& ofs <= (maxChap[1] | 0)
	)
	{ window.location.href = '/s/' + window.storyid + '/' + ofs + '/' + (window.title || ''); }
};

document.addEventListener('keydown', function(e){
	if (e.ctrlKey)
	{
		switch (e.keyCode)
		{
			case 37: moveChap(-1); break;
			case 38: window.scroll(0, 0); break;
			case 39: moveChap(1); break;
			case 40: window.scroll(0, document.body.scrollHeight); break;
		}
	}
}, false);
