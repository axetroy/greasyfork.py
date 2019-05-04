// ==UserScript==
// @name         Lemonde.fr noscript URLs
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Permet d'utiliser le site lemonde.fr sans javascript (noscript), avec des hyperliens fonctionnels. Necessite un navigateur récent.
// @author       Jules Samuel Randolph
// @match        https://www.lemonde.fr/
// @grant        none
// ==/UserScript==

(function() {
    document.querySelectorAll('span[data-href]').forEach(function (n) {
        var href = atob(n.getAttribute('data-href'))
        var anchor = document.createElement("a")
        anchor.setAttribute("href", href)
        anchor.textContent = n.textContent
        anchor.className = n.className
        n.replaceWith(anchor)
    })
})();