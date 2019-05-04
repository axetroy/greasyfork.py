// ==UserScript==
// @name        GitHub Language Statistics
// @description	Show language statistics of repositories without clicking every time
// @author      Arnie97
// @namespace   https://github.com/Arnie97
// @match       https://github.com/*
// @grant       none
// @version     2018.03.16
// ==/UserScript==

function $(cls) {
    return document.querySelector('.' + cls);
}

function removeCls(cls) {
    $(cls).classList.remove(cls);
}

function main() {
    var bar = $('repository-lang-stats-graph');
    if (!bar) return;
    bar.style = 'border: 0px';
    bar.parentNode.removeChild(bar);
    $('stats-switcher-wrapper').insertBefore(bar, $('repository-lang-stats'));
    ['stats-switcher-viewport', 'overall-summary-bottomless'].forEach(removeCls);
}

main();
