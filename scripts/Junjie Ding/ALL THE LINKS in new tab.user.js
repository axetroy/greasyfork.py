// ==UserScript==
// @name        ALL THE LINKS in new tab
// @namespace   https://www.ioriens.com/
// @include     *
// @version     1
// @run-at document-idle
// @description This will force all the links open in a new tab, even internal links.
// ==/UserScript==


(function(){
    'use strict';
    Array.from(document.getElementsByTagName('a')).map(function(b){b.setAttribute('target','_blank');});
})();