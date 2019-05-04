// ==UserScript==
// @name         taobao key fix
// @namespace    http://xuefer.win/
// @version      0.1
// @description  remove stupid accesskey design
// @author       You
// @match        https://www.taobao.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var q = document.getElementById("q");
	console.log(q);
	if (q) {
		q.removeEventListener("keydown");
	}
})();
