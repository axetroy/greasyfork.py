// ==UserScript==
// @name        Pipermail archives wrap pre
// @namespace   armeagle.nl
// @include     http://lists.*/pipermail/*
// @version     1
// @grant       none
// @description Fix something in Pipermail
// ==/UserScript==

var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
            // Selectors start here
            'body > pre { white-space: pre-wrap; }';
document.getElementsByTagName("HEAD")[0].appendChild(link);