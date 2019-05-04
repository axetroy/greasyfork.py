// ==UserScript==
// @name       CNBLOGS编辑时间提前
// @namespace    http://cnblogs.com/
// @version      0.1
// @iconURL			http://www.cnblogs.com/favicon.ico
// @description		博客园文章编辑时间提前，方便查看
// @author       Richard He
// @match        http*://www.cnblogs.com/*/p/*.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

		var d = document;
		var postTitle = d.getElementsByClassName('postTitle')[0]||d.getElementsByClassName('post')[0].getElementsByTagName('h2')[0];
				console.log(postTitle);
		var postTime = d.getElementById('post-date');
		var timeSpan = d.createElement('span');
		timeSpan.innerText = postTime.innerText;
		timeSpan.style.float = "right";
		timeSpan.style.marginRight = "80px";
		timeSpan.style.fontWeight = "normal";
		postTitle.appendChild(timeSpan);

})();