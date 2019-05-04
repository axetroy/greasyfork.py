// ==UserScript==
// @name               open image in subview
// @namespace          https://github.com/Cologler/
// @version            0.1
// @description        open image in a subview without redirect.
// @author             Cologler (skyoflw@gmail.com)
// @noframes
// @license            MIT
// @grant              GM_addStyle
// @grant              GM_getResourceText
// @require            https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js
// @require            https://cdn.jsdelivr.net/npm/lightbox2/dist/js/lightbox.min.js
// @require            https://greasyfork.org/scripts/369577/code/event-emitter.js
// @require            https://greasyfork.org/scripts/369578/code/dom.js
// @resource           lightbox https://cdn.jsdelivr.net/npm/lightbox2/dist/css/lightbox.min.css
// ==/UserScript==

// hosting on Gist: https://gist.github.com/Cologler/d8b4ac8df2b6722d9cf2b4eb08fdb309

// let type script auto-completion work.
(function() { function require(){}; require("greasemonkey"); })();

(function() {
    'use strict';

    GM_addStyle(GM_getResourceText('lightbox'));

    let index = 0;

    Dom.on('a img', z => {
        const a = z.parentElement;
        if (a.tagName === 'A' && a.children.length === 1) {
            a.setAttribute('data-lightbox', `image-${index++}`);
        }
    });
})();
