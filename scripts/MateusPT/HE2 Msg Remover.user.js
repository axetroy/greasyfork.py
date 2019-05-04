// ==UserScript==
// @name         HE2 Msg Remover
// @version      1.1
// @description  Remove HE2 Msg
// @match        http://br.hackerexperience.com/*
// @match        http://legacy.hackerexperience.com/*
// @match        https://en.hackerexperience.com/*
// @namespace https://greasyfork.org/users/190782
// ==/UserScript==

Array.prototype.contains = function(s) {
    return this.indexOf(s) !== -1;
};
String.prototype.contains = function(it) {
    return this.indexOf(it) != -1;
};

var node = document.getElementById("he2");
if(node !== undefined){
    node.remove();
}

