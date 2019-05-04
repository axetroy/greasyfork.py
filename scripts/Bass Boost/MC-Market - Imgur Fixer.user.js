// ==UserScript==
// @name         MC-Market - Imgur Fixer
// @namespace    http://mc-market.org/
// @version      0.1
// @description  Viewing images from Imgur on MC-Market made possible.
// @author       Art3mis
// @match        *.mc-market.org/*
// @grant        none
// ==/UserScript==

function replaceImages(oldUrl, newUrl) {
    var imgs = document.getElementsByTagName('img');
    for (i = 0; i<imgs.length; i++) {
        imgs[i].src = imgs[i].src.replace(oldUrl, newUrl);
    }
}

replaceImages('i.imgur.com/', 'kageurufu.net/imgur/?');