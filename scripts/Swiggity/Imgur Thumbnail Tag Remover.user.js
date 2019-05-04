// ==UserScript==
// @name            Imgur Thumbnail Tag Remover
// @namespace       +mK or OMGWTFISTHIS
// @description     Removes the thumbnail tags.
// @include         *imgur.com*
// @version         1
// @require         http://code.jquery.com/jquery-1.10.2.min.js
// @run-at         document-start
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}




var styles = [];

styles.push('.top-tag {display: none !important; }');

addGlobalStyle(styles.join(''));