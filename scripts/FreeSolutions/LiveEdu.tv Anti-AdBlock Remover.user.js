// ==UserScript==
// @name         LiveEdu.tv Anti-AdBlock Remover
// @namespace    https://greasyfork.org/users/94698
// @version      0.1
// @description  Removing Ads like it's 1999
// @author       FreeSolutions
// @match        *://*.liveedu.tv/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

if ('MutationObserver' in window)
{
    var Observer = new MutationObserver(function (Mutations) {
        var self = this;
        Mutations.forEach(function (Mutation) {
            if (Mutation.addedNodes) {
                Mutation.addedNodes.forEach(function (Node) {
                    if (Node.tagName && Node.tagName === 'SCRIPT') {
                        if (Node.innerHTML && Node.innerHTML.indexOf('blockAdBlock') > -1) {
                            Node.parentNode.removeChild(Node);
                            self.disconnect();
                        }
                    }
                });
            }
        });
    });

    Observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
    });

    window.onload = function () {
        Observer.disconnect();
    };
}