// ==UserScript==
// @name 			Estadao Paywall
// @author 			anonimo
// @description 	Remove a limitação do jornal Estadao.
// @version 		0.3

// @include 		http*estadao.com.br/*

// @namespace 		https://greasyfork.org/users/4196
// @run-at 			document-start
// ==/UserScript==

(function() {
    var pw = document.getElementById('pw-config');
    pw.parentNode.removeChild(pw);
})();