// ==UserScript==
// @name         Torrentz2.eu magnet url
// @namespace    d78aw78df6a78dfa9y23789fyas7yfhb8w79ydf
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://torrentz2.eu/*
// @grant        none
// ==/UserScript==

(function() {

    var hash = window.location.href.split('/').pop();

    document.querySelectorAll('div.downlinks')[0].innerHTML += '<center><br /><a href="magnet:?xt=urn:btih:'+hash+'">Download magnet</a><br /><br /></center>';

})();