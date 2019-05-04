// ==UserScript==
// @name         iWubbz's Candy Animation for Toradorable Skin Changer
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Dabasaur  Animation for a Toradorable skin changer.
// @author       Toradorable
// @grant        none
// @require      https://greasyfork.org/scripts/24894-toradorable-animator/code/Toradorable%20Animator.js
// ==/UserScript==

// Add animation
animator.importSkinList(
    // First argument is a skin list array.
    // Below is iWubbz's candy skinList, all credit for thease images goes to them.
    // https://greasyfork.org/en/scripts/23677-iwubbz-candy-skin-changer/code
    ["https://i.imgur.com/JulwLOF.gif",
    "https://i.imgur.com/8ivskei.gif",
    "https://i.imgur.com/G53Z60x.gif",
    "https://i.imgur.com/xkj65jf.gif",
    "https://i.imgur.com/CBYx1eu.gif",
    "https://i.imgur.com/WT9Z8d1.gif",
    "https://i.imgur.com/G7Pwydu.gif",
    "https://i.imgur.com/8iqvdiP.gif",
    "https://i.imgur.com/vv256GD.gif",
    "https://i.imgur.com/IKM0pth.gif",
    "https://i.imgur.com/Bi6pqZe.gif",
    "https://i.imgur.com/1dWzmg7.gif",
    "https://i.imgur.com/887cHbS.gif",
    "https://i.imgur.com/P9NIKk4.gif"
    "https://i.imgur.com/Th0yEhV.gif"
    ],
    // Second argument is optional. However, I recomend setting title at the least.
    //defaultDisplayTime is 1000 (1 second) by default.
    //All frames will be displayed for defaultDisplayTime milliseconds.
    //Use animator.addAnimation if you want different display times per frame.
    {title: "iWubbz's Candy", defaultDisplayTime: 500}
);
// ^^ Importing skin lists is as easy as stealing candy from iWubbz. ^^