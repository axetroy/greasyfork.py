// ==UserScript==
// @name         page view optimize - "jira board"
// @namespace    https://xianghongai.github.io
// @version      0.1.4
// @description  WXGA(1366*768)紧凑布局显示
// @author       Nicholas Hsiang
// @icon         https://xinlu.ink/favicon.ico
// @match        http*://jira.*.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var css = `
                 @media (max-width: 1680px) { .ghx-column-headers h2 { font-size: 12px; } }
                 #ghx-pool{padding-top: 60px; }
                 .ghx-column-headers h2 { white-space: nowrap; }
                 .ghx-column-headers .ghx-column {white-space: nowrap; }
                 .ghx-band-2 .ghx-issue .ghx-issue-content {padding-left: 26px; }
                 .ghx-issue .ghx-flags {left: 5px; }
                 .ghx-issue .ghx-type {left: 5px; }
               `,
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
})();