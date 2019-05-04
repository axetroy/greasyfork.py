// ==UserScript==
// @name         not rally
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Dasdasddaadadds
// @author       Toradorable
// @grant        none
// @require      https://greasyfork.org/scripts/24894-toradorable-animator/code/Toradorable%20Animator.js
// ==/UserScript==

// Add animation
animator.importSkinList(
    // First argument is a skin list array.
    // Below is iWubbz's candy skinList, all credit for thease images goes to them.
    // https://greasyfork.org/en/scripts/23677-iwubbz-candy-skin-changer/code
    ["http://i.imgur.com/hcbOTxs.png",
    "http://i.imgur.com/FhMp4KB.png",
    "http://i.imgur.com/DWdksfP.png",
    "http://i.imgur.com/u6xuPqh.png",
    "http://i.imgur.com/AllDBY5.png",
    "http://i.imgur.com/FKUTLj1.png"
    ],
    // Second argument is optional. However, I recomend setting title at the least.
    //defaultDisplayTime is 1000 (1 second) by default.
    //All frames will be displayed for defaultDisplayTime milliseconds.
    //Use animator.addAnimation if you want different display times per frame.
    {title: "iWubbz's Candy", defaultDisplayTime: 500}
);
// ^^ Importing skin lists is as easy as stealing candy from iWubbz. ^^