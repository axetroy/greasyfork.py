// ==UserScript==
// @name        Fuck-Mosaics
// @description       Supprime les mosaiques sur jvc
// @grant       none
// @include *euxvideo.com*
// @version 0.0.1.20160728120156
// @namespace https://greasyfork.org/users/57317
// ==/UserScript==
[].slice.call(document.querySelectorAll(".bloc-contenu")).filter(function(a){var b = a.querySelectorAll("img"); if(b.length > 15){[].slice.call(b).filter(function(c){c.parentNode.removeChild(c)})} })
