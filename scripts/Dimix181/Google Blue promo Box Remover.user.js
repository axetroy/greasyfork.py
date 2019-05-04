
// ==UserScript==
// @name        Google Blue promo Box Remover
// @namespace   1.0
// @description removes the blue promo box 
// @include     https://www.google.com/?noj=1
// @include     https://www.google.*
// @version     1 
// ==/UserScript==

var child = document.getElementById('pushdown');
child.parentNode.removeChild(child);

/*follow me on twitter exce1l */