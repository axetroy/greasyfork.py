// ==UserScript==
// @name Mediavida.com - Ads
// @description Removes the Mediavida ads.
// @match https://www.mediavida.com/*
// @version 1.0.2
// @author Jorge Bolois (Midefos)
// @icon https://www.mediavida.com/style/347/img/logo/beta2x.png
// @namespace https://greasyfork.org/users/223636
// ==/UserScript==

function addStyleString(string) {
    const styleNode = document.createElement('style')
    styleNode.innerHTML = string
    document.body.appendChild(styleNode)
}

const mediavidaAds = '._p-mp, ._p-tp, ._p-ft{ display: none; }'
addStyleString(mediavidaAds)