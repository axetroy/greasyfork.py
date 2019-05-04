/* jslint          moz: true, expr: true */
// ==UserScript==
// @name           Deezer AdBlock UI Fixer!
// @namespace      DeezerAdBlockUIFixer
// @description    Fix Deezer Squished UI when using an AdBlocker!
// @include        http*://*.deezer.*
// @noframe
// @author         SerSeek
// @priority          2
// @run-at         document-end
// @version        1.0.0.2
// ==/UserScript==
var xx;

!function AdBlock() {
    xx = document.getElementsByClassName('page-main');
    window.setTimeout(after, 800);
}();

function after() {
    xx[0].className = 'page-main';
}