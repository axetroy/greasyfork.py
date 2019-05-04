// ==UserScript==
// @name         Tuleap Tracker Enhance
// @namespace    https://gist.github.com/aleung/3fac39dbba3351da2c62f8d4890ef3a6
// @version      0.4
// @description  Toggle detail in card wall
// @author       Leo Liang
// @match        https://*/plugins/tracker/*
// ==/UserScript==

(function() {
    'use strict';

    function forEachSelected(selector, fn) {
        const nodes = document.querySelectorAll(selector);
        // fix compatibility on some browser version
        // https://stackoverflow.com/questions/24266313
        [].forEach.call(nodes, node => fn(node));
    }

    function createTextButton(text, onclick) {
        const button = document.createElement('a');
        button.textContent = text;
        button.className = 'btn btn-mini';
        button.onclick = onclick;
        return button;
    }

    const cardwall = document.getElementById('cardwall_board-nifty');
    if (cardwall) {
        cardwall.insertAdjacentElement('beforebegin',
                                       createTextButton('Show details',
                                                        () => forEachSelected('div .toggler-hide-noajax', node => node.click())));
        cardwall.insertAdjacentElement('beforebegin',
                                       createTextButton('Hide details',
                                                        () => forEachSelected('div .toggler-noajax', node => node.click())));
    }
})();
