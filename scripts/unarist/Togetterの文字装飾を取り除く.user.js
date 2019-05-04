// ==UserScript==
// @name         Togetterの文字装飾を取り除く
// @description  Togetterのまとめでツイート本文に適用されている文字装飾を取り除きます。
// @namespace    https://github.com/unarist/
// @version      0.1
// @author       unarist
// @match        https://togetter.com/li/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const tweet_box = document.querySelector('.tweet_box');

    const clearDecoration = ul => {
        for (const span of ul.querySelectorAll('.tweet span')) {
            const parent = span.parentNode;
            while (span.firstChild) {
                parent.insertBefore(span.firstChild, span);
            }
            parent.removeChild(span);
        }
    };

    new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeName ==='UL') {
                    clearDecoration(node);
                }
            }
        }
    }).observe(tweet_box, {childList: true});

    clearDecoration(tweet_box.querySelector('ul'));
})();