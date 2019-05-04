// ==UserScript==
// @name         page view optimize - "typescript"
// @namespace    https://xianghongai.github.io
// @version      0.0.1
// @description  固定定位 TOC(Table Of Contents)
// @author       Nicholas Hsiang
// @icon         https://xinlu.ink/favicon.ico
// @match        http*://*.typescriptlang.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var css = `
          @media (min-width: 1224px) {
              .container { display: flex; }
              .docs-container .toc-container { margin-right: 0; padding-left: 0; width: 16.66666667%; }
              #docs-navbar { position: fixed; z-index: 999; }
              #main-nav .panel>ul { max-height: 380px; overflow-y: scroll; }
              .docs-container .docs-nav .nav li { list-style-type: decimal; }
          }
          @media (min-width: 1224px) { #docs-navbar { left: 0; } }
          @media (min-width: 1440px) { #docs-navbar { left: 10%; } }
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