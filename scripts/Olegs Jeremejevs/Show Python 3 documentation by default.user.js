// ==UserScript==
// @name         Show Python 3 documentation by default
// @namespace    http://jeremejevs.com/
// @author       Olegs Jeremejevs
// @description  Automatically redirects Python 2 docs to Python 3.
// @match        *://docs.python.org/2*
// @version      1.0
// ==/UserScript==

var tmp = document.location.pathname.split('/');
tmp[1] = '3';
document.location.replace(document.location.protocol + '//' + document.location.host + tmp.join('/'));
