// ==UserScript==
// @name        Infractions Tab Remover
// @author      bls1999~
// @namespace   jiggmin
// @description Removes your infractions tab on Jiggmin.com.
// @include     http://jiggmin.com/members/USERID*
// @version     1.2
// @grant       none
// ==/UserScript==

var a = document.getElementsByClassName("tabslight");
var b = a[0];
b.childNodes[11].remove();