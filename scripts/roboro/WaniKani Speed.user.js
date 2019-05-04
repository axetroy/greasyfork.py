// ==UserScript==
// @name         WaniKani Speed
// @namespace    roboro
// @version      0.1
// @description  Speed up your reviews by moving immediately to the next kanji when correct, or opening the info box when incorrect
// @author       You
// @match        https://wanikani.com/review/session
// @match        https://www.wanikani.com/review/session
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const observer = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('correct')) {
                    nextButton.click();
                } else if (mutation.target.classList.contains('incorrect')) {
                    document.querySelector('#option-item-info').click();
                }
            }
        });
    });

    const targetEl = document.querySelector('#answer-form fieldset');
    const nextButton = targetEl.querySelector('button');
    observer.observe(targetEl, { attributes: true });
})();