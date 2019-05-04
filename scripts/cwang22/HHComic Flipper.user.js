// ==UserScript==
// @name         HHComic Flipper
// @namespace    http://seewang.me/
// @version      1.0.1
// @description  bind left&right arrow key with previous&next page, no more clicks
// @author       cwang22
// @match        http://www.hhxiee.cc/xiee/*/*
// @grant        none
// ==/UserScript==

window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;

    switch (code) {
        case 37: // left
            prevpage();
            break;

        case 39: // right
            nextpage();
            break;
        default:
            return;
    }
};
