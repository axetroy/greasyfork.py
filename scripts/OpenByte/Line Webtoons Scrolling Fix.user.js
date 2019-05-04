// ==UserScript==
// @name            Line Webtoons Scrolling Fix
// @namespace       openbyte/lwsf
// @include         http*://webtoons.com/*
// @include         http*://*.webtoons.com/*
// @author          OpenByte
// @icon            https://image.ibb.co/csauJ6/3o0_Ga_O6_LPIo_W40a_Lz_Ua_N_LNtcb_XOSYs_LFnv6j9b_Ol_Yo5_AKk4t_FXq_S80_A3_LL_0g7i_Cp4_w300.png
// @description     Fixes the laggy scrolling on Line Webtoons.
// @license         MIT License
// @encoding        utf-8
// @compatible      firefox
// @compatible      chrome
// @compatible      opera
// @version         1.0.2
// @run-at          document-end
// @grant           none
// ==/UserScript==
// This userscript was originally written by adrl (https://www.reddit.com/user/adrl).


var fixWebtoons = function () {
    oRecentWebtoon = null;
}

var watchChapterChange = function () {
    $(window).on('hashchange', function (e) {
        fixWebtoons();
    });
}

// https://stackoverflow.com/questions/5006460/userscripts-greasemonkey-calling-a-websites-javascript-functions
var inject = function (fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

inject(fixWebtoons);
inject(watchChapterChange);