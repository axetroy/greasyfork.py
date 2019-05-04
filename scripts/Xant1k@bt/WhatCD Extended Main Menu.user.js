// ==UserScript==
// @name           WhatCD Extended Main Menu
// @namespace	   https://greasyfork.org/ru/users/19952-xant1k-bt
// @description    Injects links to better.php and logchecker.php into the main menu
// @include        https://what.cd/*
// @include        https://ssl.what.cd/*
// @version        1.0
// ==/UserScript==

(function() {
	var target = document.getElementById('menu').getElementsByTagName('ul')[0]; /* Main menu */
	/*var target = document.getElementById('userinfo_minor');*/ /* User menu */


	/* Insert logchecker link */

	var lc_item = document.createElement('li');

	lc_item.id = 'nav_logchecker';

	lc_item.innerHTML = '<a href="logchecker.php">Logchecker</a>';

	target.appendChild(lc_item);


	/* Insert better link */

	var better_item = document.createElement('li');

	better_item.id = 'nav_better';

	better_item.innerHTML = '<a href="better.php">Better</a>';

	target.appendChild(better_item);
})();


You can add link to whatimg.com just insert this after target.appendChild(better_item);

/* Insert whatimg link */

var lc_item = document.createElement('li');

lc_item.id = 'nav_logchecker';

lc_item.innerHTML = 'WhatIMG';

target.appendChild(lc_item);
