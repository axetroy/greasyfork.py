// ==UserScript==
// @author         たかだか。(TakaDaka.)
// @name           Yahoo T-Point Auto Skip
// @name:ja        Yahoo T-Point Auto Skip
// @namespace      https://twitter.com/djtkdk_086969
// @description:ja Yahoo! Japan ログイン後の「T-POINT利用手続き」画面を自動的にスキップします。
// @description    Automatically skips the T-Point registration nag screen on Yahoo! Japan.
// @include        *://tcard.yahoo.co.jp/*
// @version        0.1.1.001
// @grant          none
// @license        MIT License; https://opensource.org/licenses/mit-license.php
// @homepage       https://twitter.com/djtkdk_086969
// @compatible     firefox
// @compatible     chrome
// ==/UserScript==

(function() {
    console.log("YTPAS: Started.");
    if(document.title.startsWith("Ｔポイント利用手続き") !== null ||
       document.title.startsWith("Tポイント利用手続き") !== null ) {
        console.log("YTPAS: Possibly nag screen. Checking if the skip button is present.");
        var skip = document.getElementById("skipButton");
        if(skip === null) {
            console.log("YTPAS: Skip button is not present.");
        } else {
            console.log("YTPAS: Skipping...");
            skip.click();
        }
    } else {
        console.log("YTPAS: Not a nag screen. Exiting.");
    }
})();