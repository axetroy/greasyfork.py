// ==UserScript==
// @name         Wikipedia Language Tabs
// @namespace    woky
// @version      0.1
// @description  Adds tabs for favourite languages
// @author       woky
// @match        https://*.wikipedia.org/*
// ==/UserScript==
/* jshint esnext: true */

(function(){
"use strict";

const languages = ['en', 'cs'];

const menu = document.querySelector('#p-namespaces > ul');

if (!menu)
	throw 'No menu';

languages.forEach(lang => {
	const link = document.querySelector(`.interwiki-${lang} > a`);
	if (link) {
		const span = document.createElement('span');
		span.appendChild(link);
		const item = document.createElement('li');
		item.appendChild(span);
		menu.appendChild(item);
	}
});

})();