// ==UserScript==
// @name         Schoology Auto-Login
// @namespace SchoologyAutoLogin
// @version      1
// @description  Automatically logs into Schoology
// @author       WolfB
// @include       *app.schoology.com/login*
// @grant        none
// @license      CC-BY-4.0
// ==/UserScript==

setTimeout(function() {
	document.forms[0].submit();
}, 1); //A delay of one milisecond. It does not work with 0.