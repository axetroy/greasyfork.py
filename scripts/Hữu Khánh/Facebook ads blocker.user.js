// ==UserScript==
// @name         Facebook ads blocker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       HuuKhanh
// @match        https://www.facebook.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(function(){
	var as = document.querySelectorAll('a[role="link"][href="#"]');
	as.forEach(function(a) {
		a.closest('div[data-testid="fbfeed_story"]').remove();
	})
}, 3000);
})();