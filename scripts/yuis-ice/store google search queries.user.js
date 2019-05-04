// ==UserScript==
// @name         store google search queries
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.google.co.jp/search?*
// @grant        none
// ==/UserScript==

// ~~~~~~~~~~~
// ## Creator info
// * Homepage
// https://114514.click/to/homepage
// * Blog
// https://yuis-programming.com
// * Email
// yuis.twitter+tomainbyall@gmail.com
// ~~~~~~~~~~~

if (localStorage.getItem('_storeQueries') == null) {
	localStorage.setItem('_storeQueries' , '') ;
}

localStorage.setItem('_storeQueries', localStorage.getItem('_storeQueries') + '"' + document.querySelector('#lst-ib').value + '"' + ',' + '"' + new Date().toISOString() + '"' + "\n" ) ;

